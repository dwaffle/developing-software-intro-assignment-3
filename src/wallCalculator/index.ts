import { House } from "../house";
import { Houses } from "../house/houses";

const BEAM_WIDTH = 3.5;
const BOARD_LENGTH = 8 * 12;
const WASTE_MULTIPLIER = 0.1;
const STUDS_OFFSET = 16;

// beams are required every 20 feet at minimum
const BEAMS_REQUIRED_EVERY_INCHES = 20 * 12;
const FULL_BOARDS_IN_SECTION = Math.floor(
    BEAMS_REQUIRED_EVERY_INCHES / BOARD_LENGTH
);
const FULL_BOARD_SECTION_SIZE = FULL_BOARDS_IN_SECTION * BOARD_LENGTH;

function convertFeetToInches(feet: number) {
    return feet * 12;
}

function getPlatesInLength(inches: number) {
    // devide the length by 96 inches (8 feet) and round up
    // multiply by two because we're doing the top and bottom in one calculation
    return Math.ceil(inches / BOARD_LENGTH) * 3;
}

function getStudsInLength(inches: number) {
    // calculate the studs across
    // round up to account for the last one
    const studs = Math.ceil(inches / STUDS_OFFSET);

    // make sure we add an end piece if we have a perfect multiple of 16
    const isNotPerfectWidth = Math.min(inches % STUDS_OFFSET, 1);
    const perfectWidthExtension = isNotPerfectWidth * -1 + 1;
    return studs + perfectWidthExtension;
}

function getBoardsInLength(inches: number): number {
    const plates = getPlatesInLength(inches);
    const studs = getStudsInLength(inches);
    return plates + studs;
}

function getRequiredBeamsInLength(inches: number) {
    // for every 20 feet, we need one beam
    // we know our wall is at least 20 feet, so calculate the required beams for the REST of the wall
    // if our wall is under 20 feet, this will return zero
    const wallLengthOverMinRequired = getWallLengthOverMinimumRequiredBeforeBeam(
        inches
    );
    const wallLengthPlusBeam = BEAMS_REQUIRED_EVERY_INCHES + BEAM_WIDTH;
    const requiredBeams = Math.ceil(
        wallLengthOverMinRequired / wallLengthPlusBeam
    );

    return requiredBeams;
}

function getWallLengthOverMinimumRequiredBeforeBeam(inches: number): number {
    return Math.max(inches - BEAMS_REQUIRED_EVERY_INCHES, 0);
}

// any number of inches past BEAMS_REQUIRED_EVERY_INCHES will return 1
// any number of inches below or equal to BEAMS_REQUIRED_EVERY_INCHES return 0
function isBeamRequired(inches: number): number {
    // negative numbers are zero
    const wallLengthOverMinRequired = Math.max(
        inches - BEAMS_REQUIRED_EVERY_INCHES,
        0
    );

    // remove decimals
    const wholeNumber = Math.ceil(wallLengthOverMinRequired);

    // returns 1 (at least one beam required ) or 0 (no beams required)
    const isBeamRequired = Math.min(wholeNumber, 1);

    return isBeamRequired;
}

function getFullSections(inches: number, beams: number) {
    // how many inches will we remove from a section between beams to get to the last full board
    const inchesReducedPerSection =
        BEAMS_REQUIRED_EVERY_INCHES - FULL_BOARD_SECTION_SIZE;

    // how big is the last section if all beams are at BEAMS_REQUIRED_EVERY_INCHES
    const lastSectionSize =
        inches - beams * (BEAMS_REQUIRED_EVERY_INCHES + BEAM_WIDTH);

    // how many inches of boards can we add to the last section before it will add an additional beam to the structure
    const remainingBeforeNewBeam =
        BEAMS_REQUIRED_EVERY_INCHES - lastSectionSize;

    // how many complete portions of the inchesReducedPerSection can we move to the last section
    let fullSections = Math.floor(
        remainingBeforeNewBeam / inchesReducedPerSection
    );

    // even if we can FIT fullSections moved into the last portion, we might not HAVE them in our length
    fullSections = Math.min(fullSections, beams);

    // safeguard inches not requiring a beam and return value
    fullSections = fullSections * isBeamRequired(inches);

    return fullSections;
}

function getLastSectionSize(inches: number, beams: number) {
    const fullSections = getFullSections(inches, beams);
    const lastSectionSize =
        inches - beams * BEAM_WIDTH - fullSections * FULL_BOARD_SECTION_SIZE;

    return lastSectionSize;
}

export function buildWall(inches: number) {
    // get required beams
    const requiredBeams = getRequiredBeamsInLength(inches);
    const fullSections = getFullSections(inches, requiredBeams);
    const requiredPlates = getPlatesInLength(inches);
    const lastSectionSize = getLastSectionSize(inches, requiredBeams);
    const studs =
        getBoardsInLength(FULL_BOARD_SECTION_SIZE) * fullSections +
        getBoardsInLength(lastSectionSize);
    //Moved multiplcation by 2 to account for both sides of walls.

    return {
        function: "buildWall",
        inches,
        studs: studs * 2 - requiredPlates * 2,
        posts: requiredBeams * 2,
        plates: requiredPlates * 2,
    };
}

function accountForWaste(items: number): number {
    const waste = Math.ceil(items * WASTE_MULTIPLIER);
    return waste + items;
}

export function calculateHouseRequirements(
    widthOfHouse: number,
    lengthOfHouse: number,
    isLengthInches: boolean,
    isWidthInches: boolean,
    nameOfCustomer?: string
) {
    Houses.setWallSuppliesCalculator((inches) => buildWall(inches));
    const myHouse = Houses.create(nameOfCustomer);
    if (!nameOfCustomer) {
        myHouse.name = "Testy McTesterson"; //Dummy value for using the calculator without a customer name.
    }
    let outerWidthOfHouse;
    let outerLengthOfHouse;
    //Check to see if our units are already in inches, if not, convert them, then assign them.
    if (!isWidthInches) {
        outerWidthOfHouse = convertFeetToInches(widthOfHouse);
    } else {
        outerWidthOfHouse = widthOfHouse;
    }

    if (!isLengthInches) {
        outerLengthOfHouse = convertFeetToInches(lengthOfHouse);
    } else {
        outerLengthOfHouse = lengthOfHouse;
    }

    myHouse.length = outerLengthOfHouse;
    myHouse.width = outerWidthOfHouse;

    // calculate the space inbetween corner posts
    const innerWidthOfHouse = outerWidthOfHouse - BEAM_WIDTH * 2;
    const innerLengthOfHouse = outerLengthOfHouse - BEAM_WIDTH * 2;

    const wall1 = buildWall(innerWidthOfHouse);
    const wall2 = buildWall(innerLengthOfHouse);

    const studs = wall1.studs + wall2.studs;
    const posts = wall1.posts + wall2.posts + 4;
    const plates = wall1.plates + wall2.plates;
    Houses.save(myHouse);

    return {
        posts: posts,
        studs: studs,
        plates: plates,
    };
}

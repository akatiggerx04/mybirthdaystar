import stars from "./data/star_db.json";
import unnamedStars from "./data/unnamed_stars_db.json";

function calculateAbsoluteDifference(num1, num2) {
    return Math.abs(num1 - num2);
}

export function findClosestBirthdayStar(userBirthdate) {
    const today = new Date();
    const userAge = today.getFullYear() - userBirthdate.getFullYear() -
        ((today.getMonth() > userBirthdate.getMonth() ||
            (today.getMonth() === userBirthdate.getMonth() && today.getDate() >= userBirthdate.getDate()))
            ? 0 : 1);

    const ageTolerance = 1; 
    const filteredStars = stars.filter(star =>
        star.distance !== undefined &&
        userAge >= Math.floor(star.distance) - ageTolerance &&
        userAge <= Math.ceil(star.distance) + ageTolerance
    );

    if (filteredStars.length === 0) {
        const unnamedFilteredStars = unnamedStars.filter(star =>
            star.distance !== undefined &&
            userAge >= Math.floor(star.distance) - ageTolerance &&
            userAge <= Math.ceil(star.distance) + ageTolerance
        );

        unnamedFilteredStars.sort((star1, star2) => {
            return calculateAbsoluteDifference(userAge, star1.distance) - calculateAbsoluteDifference(userAge, star2.distance);
        });

        const closestUnnamedStar = unnamedFilteredStars[0] || null;

        return closestUnnamedStar;
    }

    filteredStars.sort((star1, star2) => {
        return calculateAbsoluteDifference(userAge, star1.distance) - calculateAbsoluteDifference(userAge, star2.distance);
    });
    const closestStar = filteredStars[0] || null;

    return closestStar;
}
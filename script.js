const userNameInput = document.getElementById("user-name-input");
const userReviewInput = document.getElementById("review-textarea");
const userRatingInput = document.getElementById("star-rating");
const reviewsContainer = document.getElementById("reviews-container");

const reviewsList = document.getElementById("reviews-list");
const submitBtn = document.getElementById("submit-review-btn");

const emoji = document.getElementById("emoji");

let stars = 0;

let reviewsArray = [
  {
    userName: "Aman Gupta",
    userReview: `First, my code broke. Then, my will to live broke. Finally, I learned how to read error messages, and everything started making sense (kind of). This course was fantastic, but nobody warned me about the emotional damage of debugging.`,
    stars: 5,
    time: "11:58 PM, 22 Feb 2025",
    avatarUrl: "./assets/me.png",
  },

  {
    userName: "Piyush Garg",
    userReview: `Before this cohort, I never questioned reality. Now, I ask myself things like: "If a function runs but no one calls it, does it really exist?" and "Was CSS created to test human patience?" The program was amazing, but I may need therapy.`,
    stars: 5,
    time: "1:00 AM, 31 Feb 2057",
    avatarUrl: "./assets/piyush-sir.png",
  },
  {
    userName: "Hitesh Choudhary",
    userReview: `They said learning web development would be fun. They didn’t say JavaScript would betray me at every turn. One minute, my code is working; the next, I’m Googling "why is NaN not a number?" Overall, an amazing experience—just be ready for an emotional rollercoaster`,
    stars: 5,
    time: "4:00 AM, 30 Feb 2078",
    avatarUrl: "./assets/hitesh-sir.png",
  },
];

let reviews = JSON.parse(localStorage.getItem("reviewsArray"));

// just to set 3 initial reviews, it will not run second time
if (!reviews) {
  localStorage.setItem("reviewsArray", JSON.stringify(reviewsArray));
}

if (reviews) {
  reviewsArray = reviews;
}

document.addEventListener("DOMContentLoaded", () => renderReviews());

userRatingInput.addEventListener("click", (event) => {
  stars = Number(event.target.id.split("-")[1]);

  const starsArray = Array.from(userRatingInput.children);

  function fillColor(num) {
    for (let i = 0; i < 5; i++) {
      starsArray[i].setAttribute(
        "src",
        i < num ? "./assets/filled-star.png" : "./assets/empty-star.png"
      );
    }
  }
  fillColor(stars);

  if (stars === 1) {
    emoji.innerText = "";
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62d/512.gif"
    );
    img.setAttribute("class", "h-16 w-16");

    const p = document.createElement("p");
    p.innerText = `Oh No, We Messed Up!`;

    emoji.appendChild(img);
    emoji.appendChild(p);
  } else if (stars === 2) {
    emoji.innerText = "";
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f622/512.gif"
    );
    img.setAttribute("class", "h-16 w-16");

    const p = document.createElement("p");
    p.innerText = `Not the Worst, But...`;

    emoji.appendChild(img);
    emoji.appendChild(p);
  } else if (stars === 3) {
    emoji.innerText = "";
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f615/512.gif"
    );
    img.setAttribute("class", "h-16 w-16");

    const p = document.createElement("p");
    p.innerText = `It’s Fine... I Guess.`;

    emoji.appendChild(img);
    emoji.appendChild(p);
  } else if (stars === 4) {
    emoji.innerText = "";
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif"
    );
    img.setAttribute("class", "h-16 w-16");

    const p = document.createElement("p");
    p.innerText = `Almost perfect!`;

    emoji.appendChild(img);
    emoji.appendChild(p);
  } else if (stars === 5) {
    emoji.innerText = "";
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://fonts.gstatic.com/s/e/notoemoji/latest/1f970/512.gif"
    );
    img.setAttribute("class", "h-16 w-16");

    const p = document.createElement("p");
    p.innerText = `You Just Made Our Day!`;

    emoji.appendChild(img);
    emoji.appendChild(p);
  }
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  emoji.innerText = "";
  const userName = userNameInput.value.trim();
  const userReview = userReviewInput.value.trim();
  const avatarUrl = `https://ui-avatars.com/api/?name=${userName}&background=random&length=1`;

  if (!userName.length || !userName.length || !stars) {
    alert("Please fill the all fields");
    return;
  }

  const reviewObj = {
    userName: capitalize(userName),
    userReview,
    stars,
    time: getTime(),
    avatarUrl,
  };

  reviewsArray.push(reviewObj);
  localStorage.setItem("reviewsArray", JSON.stringify(reviewsArray));
  renderReviews();
});

const renderReviews = () => {
  reviewsList.innerText = "";
  for (let i = reviewsArray.length - 1; i >= 0; i--) {
    console.log(`running ${i}th times `);
    console.log("printing arr: ", reviewsArray[i]);
    const rating = reviewsArray[i].stars;
    const username = reviewsArray[i].userName;
    const review = reviewsArray[i].userReview;
    const imgUrl = reviewsArray[i].avatarUrl;
    const time = reviewsArray[i].time;

    const parentDiv = document.createElement("div");

    parentDiv.setAttribute(
      "class",
      "flex flex-col gap-2.5 shadow-sm p-4 grainy-light"
    );

    reviewsList.appendChild(parentDiv);

    const userInfoSection = document.createElement("div");

    userInfoSection.setAttribute("class", "flex items-center justify-between");

    const userReviewSection = document.createElement("p");

    parentDiv.appendChild(userInfoSection);
    parentDiv.appendChild(userReviewSection);

    userReviewSection.innerText = review;

    // User Information Section
    const userInfoContainer = document.createElement("div");

    userInfoSection.appendChild(userInfoContainer);

    userInfoContainer.setAttribute(
      "class",
      "flex gap-4 justify-center items-center"
    );

    // user avatar
    const userAvatar = document.createElement("img");

    userAvatar.setAttribute("src", imgUrl);
    userAvatar.setAttribute(
      "class",
      "w-10 h-10 rounded-[50%] align-middle object-cover"
    );

    userInfoContainer.appendChild(userAvatar);

    // username and time
    const userNameTimeDiv = document.createElement("div");

    userNameTimeDiv.setAttribute("class", "flex flex-col");

    userInfoContainer.appendChild(userNameTimeDiv);

    const userNameDiv = document.createElement("div");

    userNameDiv.setAttribute("class", "font-semibold");

    userNameDiv.innerText = username;

    const reviewTimeDiv = document.createElement("div");

    reviewTimeDiv.setAttribute("class", "text-[12.8px]");

    reviewTimeDiv.innerText = time;

    userNameTimeDiv.appendChild(userNameDiv);
    userNameTimeDiv.appendChild(reviewTimeDiv);

    // userRating
    const userRatingDiv = document.createElement("div");
    userRatingDiv.setAttribute("class", "flex gap-2 pr-8");

    userInfoSection.append(userRatingDiv);

    for (let i = 0; i < 5; i++) {
      const star = document.createElement("img");
      star.setAttribute(
        "src",
        i < rating ? "./assets/filled-star.png" : "./assets/empty-star.png"
      );

      star.setAttribute("class", "h-4 w-4");
      userRatingDiv.appendChild(star);
    }
  }
};

function getTime() {
  const now = new Date();

  // formatted time
  const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  const time = now.toLocaleTimeString("en-US", timeOptions);

  // formatted date with a short month name
  const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
  const date = now.toLocaleDateString("en-GB", dateOptions);

  return `${time}, ${date}`;
}

function capitalize(str) {
  return str
    .split(" ")
    .map((str) => str.replace(str.charAt(0), str[0].toUpperCase()))
    .join(" ");
}

// Fetch the data from data.json
fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Extract image URLs and addresses from the data
    const imagesData = data.map((article) => ({
      imageUrl: article.image_link,
      address: article.title,
      addressLink: article.link,
    }));

    // Create a variable to track the current index of the image being displayed
    let currentIndex = 0;

    // Function to display the next image in the slideshow
    function showNextImage() {
      // Clear the existing image and headline (if any)
      const imageContainer = document.getElementById("image-container");
      imageContainer.innerHTML = "";

      // Create a new image element and set its source to the next URL in the array
      const img = document.createElement("img");
      img.src = imagesData[currentIndex].imageUrl;

      // Create a headline element with the address and "arealeffektiv" text
      const headline = document.createElement("div");
      headline.classList.add("headline");
      headline.innerHTML = `<p><strong>${imagesData[currentIndex].address} er</strong></p><p><strong>AREALEFFEKTIV</strong></p>`;

      // Create an address link element
      const addressLink = document.createElement("a");
      addressLink.href = imagesData[currentIndex].addressLink;
      addressLink.textContent = imagesData[currentIndex].address;
      addressLink.style.color = "blue";

      // Create a container for the image, headline, and address link
      const container = document.createElement("div");
      container.classList.add("image-container");
      container.appendChild(img);
      container.appendChild(headline);
      container.appendChild(addressLink);
      addressLink.classList.add("address-link");

      // Add the container to the image container
      imageContainer.appendChild(container);

      // Increment the current index, looping back to the beginning if necessary
      currentIndex = (currentIndex + 1) % imagesData.length;
    }

    // Call showNextImage initially to display the first image
    showNextImage();

    // Set an interval to call showNextImage every 5 seconds
    setInterval(showNextImage, 10000);
  })
  .catch((error) => {
    console.error("Error fetching or parsing data:", error);
    // Optionally, display an error message to the user or handle the error in another way
  });

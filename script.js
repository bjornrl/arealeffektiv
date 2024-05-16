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
      const headlineContainer = document.getElementById("headline-container");
      headlineContainer.innerHTML = "";
      const imageContainer = document.getElementById("image-container");
      imageContainer.innerHTML = "";
      const linkContainer = document.getElementById("link-container");
      linkContainer.innerHTML = "";

      //////// IMG ////////
      const img = document.createElement("img");
      img.src = imagesData[currentIndex].imageUrl;

      //////// ADDRESS ////////
      const addressLink = document.createElement("a");
      addressLink.href = imagesData[currentIndex].addressLink;
      addressLink.textContent = imagesData[currentIndex].address;
      addressLink.style.color = "blue";

      //////// HEADLINE ////////
      const headline = document.createElement("div");
      headline.classList.add("headline");
      headline.innerHTML = `<p><strong>${imagesData[currentIndex].address} er</strong></p><p><strong>AREALEFFEKTIV</strong></p>`;

      // Create a container for the image, address link, and headline
      const container_for_headline = document.createElement("div");
      const container = document.createElement("div");
      const container_for_link = document.createElement("div");

      container.classList.add("image-container");
      addressLink.classList.add("address-link");

      // Add the headline to the container
      container_for_headline.appendChild(headline);
      container.appendChild(img);
      //container_for_link.appendChild(addressLink);

      // Add the container to the image container
      headlineContainer.appendChild(container_for_headline);
      imageContainer.appendChild(container);
      linkContainer.appendChild(container_for_link);

      // Increment the current index, looping back to the beginning if necessary
      currentIndex = (currentIndex + 1) % imagesData.length;
    }

    // Function to create and append a list of all links
    function createLinkList() {
      const linkListContainer = document.getElementById("link-list");
      linkListContainer.innerHTML = ""; // Clear existing list
      const linkList = document.createElement("ul");
      imagesData.forEach((image) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = image.addressLink;
        link.textContent = image.address;
        listItem.appendChild(link);
        linkList.appendChild(listItem);
      });
      linkListContainer.appendChild(linkList);
    }

    // Call showNextImage initially to display the first image
    showNextImage();

    // Call createLinkList initially to display the list of links
    createLinkList();

    // Set an interval to call showNextImage every 5 seconds
    setInterval(showNextImage, 10000);
  })
  .catch((error) => {
    console.error("Error fetching or parsing data:", error);
    // Optionally, display an error message to the user or handle the error in another way
  });

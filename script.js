//your code here
 const imageContainer = document.getElementById('image-container');
      const resetButton = document.getElementById('reset');
      const verifyButton = document.getElementById('verify');
      const message = document.getElementById('para');
      const classes = ['img1', 'img2', 'img3', 'img4', 'img5'];
      let selectedImages = [];
      let imageElements = [];

      function shuffleImages() {
        const images = [...classes];
        const duplicate = images[Math.floor(Math.random() * images.length)];
        images.push(duplicate);
        const shuffled = images.sort(() => 0.5 - Math.random());
        imageContainer.innerHTML = '';
        selectedImages = [];
        imageElements = [];
        message.textContent = '';
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';

        shuffled.forEach((cls, index) => {
          const img = document.createElement('img');
          img.classList.add(cls);
          img.setAttribute('data-class', cls);
          img.addEventListener('click', () => handleImageClick(img));
          imageElements.push(img);
          imageContainer.appendChild(img);
        });
      }

      function handleImageClick(img) {
        if (selectedImages.includes(img)) return;

        if (selectedImages.length === 2) return;

        img.classList.add('selected');
        selectedImages.push(img);
        resetButton.style.display = 'inline';

        if (selectedImages.length === 2) {
          verifyButton.style.display = 'inline';
        }
      }

      resetButton.addEventListener('click', () => {
        selectedImages.forEach(img => img.classList.remove('selected'));
        selectedImages = [];
        message.textContent = '';
        resetButton.style.display = 'none';
        verifyButton.style.display = 'none';
      });

      verifyButton.addEventListener('click', () => {
        verifyButton.style.display = 'none';
        const [img1, img2] = selectedImages;
        const cls1 = img1.getAttribute('data-class');
        const cls2 = img2.getAttribute('data-class');

        if (cls1 === cls2) {
          message.textContent = 'You are a human. Congratulations!';
        } else {
          message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        }
      });

      window.onload = shuffleImages;
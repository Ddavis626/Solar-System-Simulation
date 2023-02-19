//fade-in animation
let opacity = 0;
        let intervalID = 0;
        window.onload = fadeIn;
          
        function fadeIn() {
            setInterval(show, 200);
        }
          
        function show() {
            let welcome = document.getElementById("welcome");
            opacity = Number(window.getComputedStyle(welcome)
                            .getPropertyValue("opacity"));
            if (opacity < 1) {
                opacity = opacity + 0.1;
                welcome.style.opacity = opacity
            } else {
                clearInterval(intervalID);
            }
        }



// adding click event to options
function addToggleListeners() {
    // Get all toggle links
    let toggleLinks = document.querySelectorAll('.planet');
  //console.log(toggleLinks)
    // Loop through all toggle links and add event listeners
    for (let i = 0; i < toggleLinks.length; i++) {
      toggleLinks[i].addEventListener('click', function(event) {
        // Prevent the default link behavior
        event.preventDefault();
  
        // Get the ID of the section to toggle from the data-section attribute
        let sectionId = this.getAttribute('data-section');
  
        // Get the section to toggle by ID
        let section = document.getElementById(sectionId);
  
        // Get all sections and loop through them to hide any open sections
        let sections = document.querySelectorAll('.planetsec');
        for (let j = 0; j < sections.length; j++) {
          if (sections[j] !== section && sections[j].style.display === 'flex') {
            sections[j].style.display = 'none';
          }
        }
  
        // Toggle the display of the section by setting its display property to either "block" or "none"
        if (section.style.display === 'none') {
          section.style.display = 'flex';
        } else {
          section.style.display = 'none';
        }
      });
    }
  }
  
  // Call the function to add the event listeners
  addToggleListeners();

  


// Hi there !

// This js file consists of three parts. 

// 1. Website-Preview Interaction
// 2. Button Interaction
// 3. TimeOut



// ▄▀█  ___________________________________________________________________
//   █  ______________________________________________________________
//   
// This part handels all the Interactions with the website-preview elements – the main interactive element
// It's main purpose is to connect the interactions on the website-preview with the .website-info element (the Infobar)
// and the .website-overlay elements (website Iframes). All the following functions are basically adding and removing
// classes. The rest ist handeld with css. 

//  Variables – Get all relevant elements
const previews = document.querySelectorAll('.website-preview');
const websiteInfos = document.querySelectorAll('.website-info');
const overlays = document.querySelectorAll('.website-overlay');
const navigation = document.getElementById('nav');


// All Used Functions
// ⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺⎺

// Nearly all functions use targetInfo in some way. This the attribute data-target='xyz' used over in the HTML. 
// It connects all related html elements – a specific project. So i can find what belongs together.  In the 
// beginning I used classes with classList.contains('xyz'), but the data-attribute feels like the neater way. 
// I also never really used it before like this, so it was a nice exersice.  


// Handle the website-info Elements

    //  Add the 'info-slide' class to matching website-info element
    function addInfoSlide(targetInfo) {
        if (targetInfo) {
            websiteInfos.forEach(websiteInfo => {
                if (websiteInfo.dataset.target === targetInfo) {
                    websiteInfo.classList.add('info-slide');
                }
            });
        }
    }

    // Remove the 'info-slide' class from all website-info elements
    function removeInfoSlide() {
        websiteInfos.forEach(websiteInfo => {
            websiteInfo.classList.remove('info-slide');
        });
    }

    // Shrink and reset website-info for Overlay Mode  
    // When the Overlay (Iframe) is active the info-slide needs to 
    // be a bit smaller so the close button fits
    function shrinkInfo(){
        websiteInfos.forEach(websiteInfo => {
            websiteInfo.classList.add('overlay-mode');
        });
    }

    function colorInfo(targetInfo) {
        if (targetInfo) {
            websiteInfos.forEach(websiteInfo => {
                if (websiteInfo.dataset.target === targetInfo) {
                    navigation.classList.add(`${targetInfo}`);
                }
            });
        }
    }

    // This is the reset
    function resetInfo(){
        websiteInfos.forEach(websiteInfo => {
            websiteInfo.classList.remove('overlay-mode');
            navigation.removeAttribute('class')
        });
    }


    

// Handele the website-overlay Elements (Iframes)

    // Add class to show the overlay
    function showOverlay(targetInfo) {
        if (targetInfo) {
            overlays.forEach(overlay => {
                if (overlay.dataset.target === targetInfo) {
                    overlay.classList.add('show-overlay');
                }
            });
        }
    }

    // Remove remove class to hide the overlay
    function hideOverlay(){
        overlays.forEach(overlay => {
            overlay.classList.remove('show-overlay');
        });
    }


    // Lazy-load the iframe src for the matching overlay
    // With this the iframe loads the first time website-preview is clicked
        function loadOverlaySrc(targetInfo) {
            const overlay = Array.from(overlays).find(iframe => iframe.dataset.target === targetInfo);
            if (overlay && !overlay.hasAttribute("src")) {
                const overlaySrc = overlay.dataset.src;
                if (overlaySrc) {
                    overlay.setAttribute("src", overlaySrc);
                } else {
                    console.error(`No data-src attribute: ${targetInfo}`);
                }
            }
        }



// Attach listeners to all website-preview Elements
previews.forEach(preview => {

    // Hover
    preview.addEventListener('mouseenter', () => {
        const targetInfo = preview.dataset.target;
        addInfoSlide(targetInfo);
    });

    // End Hover
    preview.addEventListener('mouseleave', () => {
        if (! preview.classList.contains('clicked')) { 
            removeInfoSlide();
        }
        preview.classList.remove('clicked');
    });

    // Click for overlay
    preview.addEventListener('click', () => {
        const targetInfo = preview.dataset.target;
        showOverlay(targetInfo);
        loadOverlaySrc(targetInfo);
        addInfoSlide(targetInfo);
        colorInfo(targetInfo);
        shrinkInfo(); 

        preview.classList.add('clicked');

        closeOverlay.classList.remove('close-slide');
    });
});




//  ▀▀▄  ___________________________________________________________________
//  █▄▄  ______________________________________________________________
//
// This handles all the button interactions so Projects, Workshop and Close

//  Variables – Get all relevant elements
const buttonProjects = document.getElementById('projects');
const buttonWorkshop = document.getElementById('workshop');
const projectWebsites = document.getElementById('project-websites');
const workshopWebsites = document.getElementById('workshop-websites');
const closeOverlay = document.getElementById('close');


// Switch between Projects and Workshops
buttonProjects.addEventListener('click', () => {
    projectWebsites.classList.remove('out-of-view-left');
    workshopWebsites.classList.add('out-of-view-right');

    buttonProjects.classList.add('button--selected');
    buttonWorkshop.classList.remove('button--selected');
});

buttonWorkshop.addEventListener('click', () => {
    projectWebsites.classList.add('out-of-view-left');
    workshopWebsites.classList.remove('out-of-view-right');

    buttonProjects.classList.remove('button--selected');
    buttonWorkshop.classList.add('button--selected');
});


// Close Overlays
closeOverlay.addEventListener('click', () => {
    hideOverlay(); 
    resetInfo(); 
    removeInfoSlide();
    closeOverlay.classList.add('close-slide');
});





// ▄▀▀▄  ___________________________________________________________________
//  ▄▄▀ ______________________________________________________________
//   
// Closes Overlay after 2min of inactity

let inactivityTimer;

function resetInactivityTimer() {
  // Clear the existing timer
  clearTimeout(inactivityTimer);

  // Set a new timer for 2 minutes 
  inactivityTimer = setTimeout(() => {
    hideOverlay(); 
    resetInfo(); 
    removeInfoSlide();
  }, 120000); // 2 minutes in ms
}

// Detect Movement, Keystrokes or Clics
document.addEventListener("mousemove", resetInactivityTimer);
document.addEventListener("keydown", resetInactivityTimer);
document.addEventListener("click", resetInactivityTimer);

// Start timer on pageload
resetInactivityTimer();
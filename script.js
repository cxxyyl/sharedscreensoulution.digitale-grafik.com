
//  Handle website-preview events
const previews = document.querySelectorAll('.website-preview');
const websiteInfos = document.querySelectorAll('.website-info');
const overlays = document.querySelectorAll('.website-overlay');


// Add the 'info-slide' class to the matching website-info
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


// Shrink website-info for Iframe
function shrinkInfo(){
    websiteInfos.forEach(websiteInfo => {
        websiteInfo.classList.add('overlay-mode');
    });
}
// Reset website-info for Iframe
function resetInfo(){
    websiteInfos.forEach(websiteInfo => {
        websiteInfo.classList.remove('overlay-mode');
    });
}

// Add the matching overlay
function showOverlay(targetInfo) {
    if (targetInfo) {
        overlays.forEach(overlay => {
            if (overlay.dataset.target === targetInfo) {
                overlay.classList.add('show-overlay');
            }
        });
    }
}

// Remove matching Overlay 
function hideOverlay(){
    overlays.forEach(overlay => {
        overlay.classList.remove('show-overlay');
    });
}




// Lazy-load the iframe src for the matching overlay
function loadOverlaySrc(targetInfo) {
    const overlay = Array.from(overlays).find(iframe => iframe.getAttribute("data-target") === targetInfo);
    if (overlay && !overlay.hasAttribute("src")) {
        const overlaySrc = overlay.getAttribute("data-src");
        if (overlaySrc) {
            overlay.setAttribute("src", overlaySrc);
        } else {
            console.error(`No data-src found for overlay with target: ${targetInfo}`);
        }
    }
}




//Attach event listeners to a single preview
function attachPreviewListeners(preview) {
    preview.addEventListener('mouseenter', () => {
        const targetInfo = preview.dataset.target;
        addInfoSlide(targetInfo);
    });

    preview.addEventListener('mouseleave', () => {
        if (! preview.classList.contains('clicked')) { 
            removeInfoSlide();
        }
        preview.classList.remove('clicked');
    });

    preview.addEventListener('click', () => {
        const targetInfo = preview.dataset.target;
        showOverlay(targetInfo);
        loadOverlaySrc(targetInfo);
        addInfoSlide(targetInfo);
        shrinkInfo(); 

        preview.classList.add('clicked');

        closeOverlay.classList.remove('close-slide');
    });
}

// Attach listeners to all previews
previews.forEach(preview => {
    attachPreviewListeners(preview);
});


// Shift between the two <main> for projects and workshop 

const buttonProjects = document.getElementById('projects');
const buttonWorkshop = document.getElementById('workshop');
const projectWebsites = document.getElementById('project-websites');
const workshopWebsites = document.getElementById('workshop-websites');

const closeOverlay = document.getElementById('close');

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

closeOverlay.addEventListener('click', () => {
    hideOverlay(); 
    resetInfo(); 
    removeInfoSlide();

    closeOverlay.classList.add('close-slide');
});
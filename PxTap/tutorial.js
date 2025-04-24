const TUTORIAL = {
  steps: [
    {
      title: "Welcome to PxTapper!",
      content: "PxTapper is a clicker game where you tap on ingredients to collect dye. Use the dye to upgrade your skills and purchase boosters!",
      image: null
    },
    {
      title: "Tapping",
      content: "Tap on the ingredient in the center of the screen to collect dye. Each ingredient has different dye properties based on its color.",
      image: null
    },
    {
      title: "Resources",
      content: "There are three main dye colors: Red, Blue, and Yellow. Different ingredients will give different combinations of these dyes.",
      image: null
    },
    {
      title: "Upgrades",
      content: "As you level up, you'll be able to choose skills to upgrade. These will make you more powerful and efficient at collecting dye.",
      image: null
    },
    {
      title: "Shop",
      content: "The shop offers temporary boosters that can help you progress faster. Use your dye to purchase these boosters.",
      image: null
    },
    {
      title: "Prestige",
      content: "When you reach a high enough level, you can prestige to reset your progress but gain permanent bonuses for your next run.",
      image: null
    },
    {
      title: "Collection",
      content: "Discover all the different ingredients and add them to your collection. Complete the collection for achievements!",
      image: null
    }
  ],

  currentStep: 0,
  completed: false,

  init: function() {
    // Check if tutorial has been completed
    const tutorialStatus = localStorage.getItem('pxjTutorial');
    if (tutorialStatus) {
      this.completed = JSON.parse(tutorialStatus).completed;
    }

    // Show tutorial on first load if not completed
    if (!this.completed) {
      this.showTutorial();
    }
  },

  showTutorial: function() {
    this.currentStep = 0;
    this.renderStep();
    ui.togglePanel('tutorial-panel');

    // Set up navigation buttons
    document.getElementById('tutorial-prev').addEventListener('click', () => this.prevStep());
    document.getElementById('tutorial-next').addEventListener('click', () => this.nextStep());
  },

  renderStep: function() {
    const step = this.steps[this.currentStep];
    const content = document.getElementById('tutorial-content');

    content.innerHTML = `
      <div class="tutorial-step">
        <h3>${step.title}</h3>
        <p>${step.content}</p>
        ${step.image ? `<img src="${step.image}" alt="${step.title}">` : ''}
        <div class="tutorial-progress">Step ${this.currentStep + 1} of ${this.steps.length}</div>
      </div>
    `;

    // Update button states
    document.getElementById('tutorial-prev').disabled = this.currentStep === 0;

    const nextButton = document.getElementById('tutorial-next');
    if (this.currentStep === this.steps.length - 1) {
      nextButton.textContent = 'Finish';
    } else {
      nextButton.textContent = 'Next';
    }
  },

  nextStep: function() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.renderStep();
    } else {
      // Tutorial completed
      this.completed = true;
      this.save();
      ui.togglePanel('tutorial-panel');
    }
  },

  prevStep: function() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep();
    }
  },

  save: function() {
    localStorage.setItem('pxjTutorial', JSON.stringify({
      completed: this.completed
    }));
  }
};

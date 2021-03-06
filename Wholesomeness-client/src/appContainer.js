class AppContainer {
    static activities = []
    static categories = []
    url = "http://localhost:3000"
    static routinePractice = {}

    bindEventListeners() {
        const btn = document.getElementById('createRoutinePractice');
        btn.addEventListener('click', this.getRandomActivities)
    }

    getRandomActivities() {
        let randomActivities = [];
        AppContainer.categories.forEach(category => {
            randomActivities.push(Activity.byCategory(category.name)[Math.floor(Math.random()*Activity.byCategory(category.name).length)])
        });
        new routinePractice(randomActivities) 
        const routinePracticeDiv = document.getElementById(`routinePractice`);
        AppContainer.routinePractice.activities.forEach(routinePractice => {
            const activityDiv = document.createElement('div');
            activityDiv.innerText = routinePractice.name; 
            routinePracticeDiv.appendChild(activityDiv);
        })
    }

    
    getActivities() {
        // fetch reqeust to activities
        fetch(this.url + '/activities')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            data.forEach(activity => {
                new Activity(activity.name, activity.category)
                if (!AppContainer.categories.map(category => category.name).includes(activity.category.name)) {
                    new Category(activity.category.name)
                 }
            });
            // render activities
            this.renderActivities();
  
        })
        .catch(err => alert(err));
    };

    renderActivities() {
        const psychSelect = document.getElementById('psychological')
        const physicalSelect = document.getElementById('physical')
        const spiritualSelect = document.getElementById('spiritual')
        AppContainer.activities.forEach(activity => {
            const option = document.createElement('option');
            option.innerText = activity.name;
            switch(activity.category.name) {
                case "psychological":
                    psychSelect.appendChild(option);
                 break;
                case "spiritual":
                    spiritualSelect.appendChild(option);
                 break;
                case "physical":
                    physicalSelect.appendChild(option);
                 break;
            default:
            }
        })
    }

}
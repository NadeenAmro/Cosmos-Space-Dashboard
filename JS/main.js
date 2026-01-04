
const AllNavLinks = document.querySelectorAll("aside nav a")
const AllSections = document.querySelectorAll("section")
const searchInput = document.getElementById("apod-date-input")

const newDate = new Date().toISOString().split("T")[0];
console.log(newDate);

searchInput.value = newDate





AllNavLinks.forEach((link)=>{
    link.addEventListener("click",function(){
        AllSections.forEach((sec)=>{
            sec.classList.add("hidden")
        })

        document.getElementById(link.getAttribute("data-section")).classList.remove("hidden")
          AllNavLinks.forEach(a=>{
            a.classList.remove("bg-blue-500/10", "text-blue-400")
            a.classList.add("text-slate-300") 
        })

        link.classList.add("bg-blue-500/10","text-blue-400")
        link.classList.remove("text-slate-300")

        
    })

})

getTodaySpace(newDate)

async function getTodaySpace(date) {
    document.getElementById("apod-loading").classList.remove("hidden")
    document.getElementById("apod-image").classList.add("hidden")
    document.getElementById("apod-explanation").innerHTML= "loading .."


     fetch(`https://api.nasa.gov/planetary/apod?api_key=OV4NKMR2CCSj7Dbd0aBYIUzNHz2GrQbsk0VzzrDT&date=${date}`).then((res)=>{
     return res.json()
     }).then((response)=>{
      
         let todayDate =  new Date().toLocaleDateString("en-us",{
            month:"long",
            day:"numeric",
            year:"numeric"
         });
        //  console.log(todayDate);
         

         document.getElementById("apod-image").setAttribute("src",response.hdurl)
         document.getElementById("apod-explanation").innerHTML= response.explanation
         document.getElementById("apod-title").innerHTML =response.title
         document.getElementById("apod-date-detail").innerHTML = response.date
         document.getElementById("apod-date-info").innerHTML = response.date
         document.getElementById("apod-date").innerHTML = `Astronomy Picture of the Day - ${todayDate}`
        //  document.querySelector("#apod-date-span").innerHTML = date


     }).finally(()=>{
        document.getElementById("apod-loading").classList.add("hidden")
        document.getElementById("apod-image").classList.remove("hidden")

     })
        
     
 
    // console.log(data)

}



document.getElementById("load-date-btn").addEventListener("click",function(){

    getTodaySpace(searchInput.value)
})

getLuanches()

async function getLuanches() {
    fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming").then((res)=>{
        return res.json()
    }).then((response)=>{
        console.log(response.results)
        displayLunches(response.results)
      document.getElementById("featured-launch").innerHTML = `
      <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        Go
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${response.results[0].name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>SpaceX</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>Starship</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">${response.results[0].agency_launch_attempt_count}</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">Dec 31, 2025</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">7:00 PM UTC</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${response.results[0].pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${response.results[0].pad.location.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${response.results[0].mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->

                      <img src="${response.results[0].image.image_url}" class="h-full w-full object-cover" alt="">

                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
      `
    })
    
}

function displayLunches(lunches) {
  let container = "";
  for (let i = 1; i < lunches.length; i++) {
    container +=`
    <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img src="${lunches[i].image.image_url}" class="h-full w-full object-cover" alt="">
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${lunches[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${lunches[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">Mar 15, 2024</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">23:00 UTC</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${lunches[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${lunches[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
    `
    
  }

  document.getElementById("launches-grid").innerHTML = container
}

getPlanet()

let plants = []

async function getPlanet() {
  fetch("https://solar-system-opendata-proxy.vercel.app/api/planets").then((res)=>{
    return res.json()
  }).then((response)=>{
    plants = response.bodies
    console.log(response.bodies);
    displayPlants(response.bodies)
    
  })
}



function displayPlants(plants) {
  let container = ""
  for (let i = 0; i < plants.length; i++) {
    container += `
    <div
    onclick="displayDetails(${i})"
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="${plants[i].name}"
              style="--planet-color: #eab308"
              onmouseover="this.style.borderColor='#eab30880'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${plants[i].image}"
                  alt="${plants[i].name}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${plants[i].name}</h4>
              <p class="text-xs text-slate-400 text-center">${plants[i].axialTilt} AU</p>
            </div>
    `
    
  }

  document.getElementById("planets-grid").innerHTML = container;
  
}

function displayDetails(i) {
  console.log(i);
  document.getElementById("planet-detail-image").setAttribute("src",plants[i].image)
  document.getElementById("planet-detail-name").innerHTML = `${plants[i].name}`
  document.getElementById("planet-detail-description").innerHTML = `${plants[i].description}`
  document.getElementById("planet-distance").innerHTML = `${plants[i].semimajorAxis} km`
  document.getElementById("planet-radius").innerHTML = `${plants[i].meanRadius} km`
  document.getElementById("planet-mass").innerHTML = `${plants[i].mass.massValue} × 10²⁴ kg`
  document.getElementById("planet-density").innerHTML = `${plants[i].density} g/cm³`
  const moons = Array.isArray(plants[i].moons) ? plants[i].moons.length : 0;
  document.getElementById("planet-moons").innerHTML = moons;
  document.getElementById("planet-gravity").innerHTML = `${plants[i].gravity} `
  document.getElementById("planet-discoverer").textContent =
  plants[i].discoveredBy ? plants[i].discoveredBy : "Known since antiquity";
 document.getElementById("planet-discovery-date").textContent =
  plants[i].discoveredBy ? plants[i].discoveryDate : "Ancient times";
  const km = plants[i].perihelion/1000000
    document.getElementById("planet-perihelion").innerHTML = `${Math.round(km*10)/10}M KM `
const AphM = plants[i].aphelion/1000000
    document.getElementById("planet-aphelion").innerHTML = `${Math.round(AphM*10)/10}M KM `
  document.getElementById("planet-eccentricity").innerHTML = `${plants[i].eccentricity} `
    document.getElementById("planet-inclination").innerHTML = `${plants[i].inclination}°`
    document.getElementById("planet-axial-tilt").innerHTML = `${plants[i].axialTilt}°`
    document.getElementById("planet-temp").innerHTML = `${plants[i].avgTemp}°C`
    const EsVelo = plants[i].escape/1000
    document.getElementById("planet-escape").innerHTML = `${Math.round(EsVelo*10)/10}KM/s`


}









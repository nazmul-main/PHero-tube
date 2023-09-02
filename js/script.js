
// Blog button
document.getElementById("openButton").addEventListener("click", function () {
  window.open("answer.html", "_blank");
});


const handleCategory = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
  const data = await res.json()
  const tubeCetagory = data.data;
  //   console.log(tubeCetagory);

  const tabContainer = document.getElementById('tap-container')
  tubeCetagory.forEach((category) => {
    const div = document.createElement('div')
    div.innerHTML = `
          <a onclick="handleLoadVideo('${category.category_id}')" class="tab bg-[#25252533] px-2 md:px-6 py-1 rounded-sm text-md font-semibold">${category.category}</a>
          `
    tabContainer.appendChild(div)

  });
}

const handleLoadVideo = async (categoryId = 1000) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
  const videoData = data?.data;
  // console.log(videoData);
  const errorComtainer = document.getElementById('error-container');
  errorComtainer.innerHTML = ''
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';


  if (videoData.length > 0) {
    videoData.forEach((video) => {
      const div = document.createElement('div');
      div.innerHTML = `
          <div class="card bg-base-100 shadow-sm ">
            <div class="relative">
              <img class="w-full h-40 rounded-md" src="${video.thumbnail}" />
              ${video.others.posted_date ? `<span class="absolute bottom-0 right-0 bg-[#171717] p-1 text-center text-[12px] text-white mb-1 mr-1 rounded-md">${postDate(video.others.posted_date)}</span>` : ''}
              
            </div>

      
          
          <div class="flex items-start gap-4 mt-4 p-2">
                      <div class="avatar">
                        <div class=" w-10  mt-2 rounded-full">
                        <img class="" src="${video.authors[0]?.profile_picture}"/>
                        </div>
                      </div>
                      <div class="">
                          <h3 class="text-md font-bold mt-2">${video.title}</h3>
                      <div class=" flex gap-2 justify-start items-center">
                            <h4 class="mt-2">${video.authors[0]?.profile_name}</h4>
                            <p class="w-4 h-4 rounded-full mt-2" > ${video.authors[0]?.verified  ? '<img src="images/varify.png"> ' : ''}</p>
                      </div>
                        <h4 class="mt-2">${video.others.views ? video.others.views : 'no views'} Views</h4>
                      </div>
                </div>
          `;
      cardContainer.appendChild(div);

      function postDate(seconds) {
        const secondsInMinute = 60;
        const secondsInHour = 3600;
        const secondsInDay = 86400;
        const secondsInYear = 31536000;
    
        const years = Math.floor(seconds / secondsInYear);
        const days = Math.floor((seconds % secondsInYear) / secondsInDay);
        const hours = Math.floor((seconds % secondsInDay) / secondsInHour);
        const minutes = Math.floor((seconds % secondsInHour) / secondsInMinute);
    
        let result = '';
    
        if (years > 0) {
            result += `${years} year `;
        }
        if (days > 0) {
            result += `${days} day `;
        }
    
        if (hours > 0) {
            result += `${hours} hrs `;
        }
    
        if (minutes > 0) {
            result += `${minutes} min`;
        }
    
        return result.trim();
    }

    


    });
    const errorComtainer = document.getElementById('error-container');
    errorComtainer.innerHTML = ''
  } else {

    errorComtainer.innerHTML = `
      <div class="flex justify-center items-center mt-24">
        <div class="mx-auto  text-center">
          <img class="mx-auto" src="./images/icon.png" alt="Icon">
          <p class="text-4xl font-bold">Oops!! Sorry, There is no <br> content here</p>
        </div>
      </div>
      `;

  }

};




handleCategory();
handleLoadVideo();




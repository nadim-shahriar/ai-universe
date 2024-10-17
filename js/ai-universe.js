const loadData = async (isSeeMore) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    const data = await res.json();
    const tools = data.data.tools;
    console.log(Array.isArray(tools))
    displayTools(tools, isSeeMore)
}

const displayTools = (tools, isSeeMore) => {
    // feature container
    const featureContainer = document.getElementById("features-container");
    // clear feature container
    featureContainer.textContent = '';
    // see more
    const seeMoreContainer = document.getElementById("see-more-container")

    const length = tools.length
    if (length > 6 && !isSeeMore) {
        seeMoreContainer.classList.remove('hidden')
    }
    else {
        seeMoreContainer.classList.add('hidden')
    }
    console.log(tools)


    if (!isSeeMore) {
        tools = tools.slice(0, 6)
    }

    tools.forEach(tool => {
        // console.log(tool)
        // create a div
        const toolCard = document.createElement("div")
        // set innerHTML
        toolCard.innerHTML = `
            <div onclick="handleBodyClick('${tool.id}'); show_details_modal.showModal()" class="card bg-gray-100 m-5 p-5 shadow-xl">
                <figure>
                    <img src="${tool.image}" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title font-bold">Features</h2>
                    <ol class="list-decimal ml-4">
                        <li>${tool.features[0]}</li>
                        <li>${tool.features[1]}</li>
                        <li>${tool.features[2]}</li>
                    </ol>

                    <hr class="border-[#11111133] my-6">
                    <div class="space-y-4">
                        <h3 class="font-bold">${tool.name}</h3>
                        <h5 class="flex gap-2">
                            <img src="images/Frame.svg" alt=""><p>${tool.published_in}</p>
                        </h5>
                    </div>
                </div>
            </div>
        `;
        featureContainer.appendChild(toolCard)
        toggleSpinner(false)
    })
}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove("hidden")
    }
    else {
        loadingSpinner.classList.add("hidden")
    }
}

const handleSeeMore = () => {
    loadData(true)
}

// load click
const handleBodyClick = async (id) => {
    console.log(id)
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json();
    const tool = data.data
    console.log(tool)
    showToolDetails(tool)

}
// handle show details
const showToolDetails = (tool) => {
    const showDetailsContainer = document.getElementById("show-details-container")
    console.log(showDetailsContainer)
    showDetailsContainer.classList = ""

    showDetailsContainer.innerHTML = `
        
        <div class="flex">
            <div class="border-[#EB5757] border-2 m-10 p-10 rounded-2xl">
            <h1 class="font-bold text-xl">${tool.description}</h1>
            <div  class="flex gap-10 mt-4 justify-center items-center text-center">
                <div class="text-[#03A30A]">
                    <h1 class="font-bold text-xl">${tool.pricing?.[0]?.price || 'Not Available'}</h1>
                    <h1 class="font-bold text-xl">${tool.pricing?.[0]?.plan || 'Not Available'}</h1>
                </div>
                <div class="text-[#F28927]">
                    <h1 class="font-bold text-xl">${tool.pricing?.[1]?.price || 'Not Available'}</h1>
                    <h1 class="font-bold text-xl">${tool.pricing?.[1]?.plan || 'Not Available'}</h1>
                </div>
                <div class="text-[#EB5757]">
                    <h1 class="font-bold text-xl">${tool.pricing?.[2]?.price || 'Not Available'}</h1>
                    <h1 class="font-bold text-xl">${tool.pricing?.[0]?.price || 'Not Available'}</h1>
                </div>
            </div>
            <div class="flex gap-6">
                <div>
                    <h2 class="font-bold text-xl my-4">Features</h2>
                    <div class="text-lg">
                        <li>${tool.features[1].feature_name}</li>
                        <li>${tool.features[2].feature_name}</li>
                        <li>${tool.features[3].feature_name}</li>
                    </div>
                </div>
                <div>
                    <h2 class="font-bold text-xl my-4">Integrations</h2>
                    <div class="text-lg">
                        <li>${tool.integrations?.[0] || 'Integration not available'}</li>
                        <li>${tool.integrations?.[1] || 'Integration not available'}</li>
                        <li>${tool.integrations?.[2] || 'Integration not available'}</li>
                    </div>
                </div>
            </div>

            </div>
            <div class="relative mt-10 mr-10">
                <img class="rounded-2xl" src="${tool.image_link[0]}"/>
                <h2 class="font-bold text-center text-3xl my-4">${tool.input_output_examples?.[0]?.input || 'Not available'}</h2>
                <h2 class=" text-center text-2xl my-4">${tool.input_output_examples?.[0]?.output || 'Not available'}</h2>
                ${tool.accuracy?.score ? `
                    <div class="w-[146px] bg-[#EB5757] rounded-lg absolute top-3 right-3">
                      <p class="text-white py-1 text-center font-semibold">${tool.accuracy.score}% accuracy</p>
                    </div>
                  ` : ''}
            </div>
        </div>       
    `;

}


toggleSpinner(true)
loadData()
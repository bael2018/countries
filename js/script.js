const burgerBtn = document.querySelector('.burger')
const categoryBlock = document.querySelector('.category')
burgerBtn.addEventListener('click' , e => {
    e.preventDefault()
    categoryBlock.classList.toggle('show')
})
window.addEventListener('load' , () => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET' , 'https://restcountries.eu/rest/v2')
    xhr.addEventListener('load' , () => {
        const response = JSON.parse(xhr.response)
        if(!localStorage.getItem('countries')){
            localStorage.setItem('countries' , JSON.stringify(response))
        }else{
            return
        }
    })
    xhr.send()
})
const getCountries = cb => {
    const lem = new XMLHttpRequest()
    lem.open('GET' , 'https://restcountries.eu/rest/v2')
    lem.addEventListener('load' , () => {
        const response = JSON.parse(lem.response)
        cb(response)
    })
    lem.send()
}
const container = document.querySelector('.card_container')
getCountries(res => {
    const template = res.map(({name , flag}) => {
        return `    
        <div onclick='showSingle(${JSON.stringify(name)})' class="card">
            <img src="${flag}" alt="">
            <h2>${name}</h2>
        </div>
        `
    }).join('') 
    container.innerHTML = template
})
const searchName = document.querySelector('.searchName')
const searchCapital = document.querySelector('.searchCapital')
searchName.addEventListener('input' , e => {
    const value = e.target.value.toUpperCase()
    const getCountries = JSON.parse(localStorage.getItem('countries'))
    let arr = []
    getCountries.forEach(item => {
        if(item.name.toUpperCase().includes(value)){
            arr.push(item)
        }
    })
    const template = arr.map(({name , flag}) => {
        return `    
        <div onclick='showSingle(${JSON.stringify(name)})' class="card">
            <img src="${flag}" alt="">
            <h2>${name}</h2>
        </div>
        `
    }).join('') 
    container.innerHTML = template
    searchCapital.value = ''
})
searchCapital.addEventListener('input' , e => {
    const value = e.target.value.toUpperCase()
    const getCountries = JSON.parse(localStorage.getItem('countries'))
    let arr = []
    getCountries.forEach(item => {
        if(item.capital.toUpperCase().includes(value)){
            arr.push(item)
        }
    })
    const template = arr.map(({name , flag}) => {
        return `    
        <div onclick='showSingle(${JSON.stringify(name)})' class="card">
            <img src="${flag}" alt="">
            <h2>${name}</h2>
        </div>
        `
    }).join('') 
    container.innerHTML = template
    searchName.value = ''
})  
function showSingle(item){
    const sok = new XMLHttpRequest()
    sok.open('GET' , `https://restcountries.eu/rest/v2/name/${item}`)
    sok.addEventListener('load' , () => {
        const response = JSON.parse(sok.response)
        const template = response.map(({name , flag , capital , demonym , borders, currencies: [{code , symbol}], region , subregion , population , area , cioc, topLevelDomain , numericCode , nativeName}) => {
        return `    
        <div class="single_container">
        <div onclick='reLoad()' class="back"><h2>Back</h2></div>
        <div class="single_child">
            <img src="${flag}" alt="">
        </div>
        <div class="single_child">
            <h2>${name}</h2>
            <div class="single_wrapper">
                <ul>
                    <li>
                        <span>Capital:</span>
                        <span class='El'>${capital}</span>
                    </li>
                    <li>
                        <span>Region:</span>
                        <span class='El'>${region}</span>
                    </li>
                    <li>
                        <span>Subregion:</span>
                        <span class='El'>${subregion}</span>
                    </li>
                    <li>
                        <span>Population:</span>
                        <span class='El'>${population}</span>
                    </li>
                    <li>
                        <span>Area:</span>
                        <span class='El'>${area}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="single_title">More Info</div>
        <div class="single_child single_child_alt single_child_alt_3">
            <ul>
                <li>
                    <h3>Borders</h3>
                    <div>${borders}</div>
                </li>
                <li>    
                    <h3>Currencies</h3>
                    <div>${code} , ${symbol}</div>
                </li>
            </ul>
        </div>
        <div class="single_child single_child_alt_1">
            <ul>
                <li>
                    <span>TopLevelDomain:</span>
                    <span class='El'>${topLevelDomain}</span>
                </li>
                <li>
                    <span>Cioc:</span>
                    <span class='El'>${cioc}</span>
                </li>
                <li>
                    <span>Numericode:</span>
                    <span class='El'>${numericCode}</span>
                </li>
                <li>
                    <span>NativeName:</span>
                    <span class='El'>${nativeName}</span>
                </li>
                <li>
                    <span>Demonym:</span>
                    <span class='El'>${demonym}</span>
                </li>
            </ul>
        </div>
        </div>
        `
    }).join('') 
    container.innerHTML = template
    })
    sok.send()
}
function showRegion(item){
    const lem = new XMLHttpRequest()
    lem.open('GET' , `https://restcountries.eu/rest/v2/region/${item}`)
    lem.addEventListener('load' , () => {
        const response = JSON.parse(lem.response)
        const template = response.map(({name , flag}) => {
            return ` <div onclick='showSingle(${JSON.stringify(name)})' class="card">
                <img src="${flag}" alt="">
                <h2>${name}</h2>
            </div>
            `
        }).join('')     
        container.innerHTML = template
    })
    lem.send()
    categoryBlock.classList.remove('show')
}
function showAll(){
    getCountries(res => {
        const template = res.map(({name , flag}) => {
            return `    
            <div onclick='showSingle(${JSON.stringify(name)})' class="card">
                <img src="${flag}" alt="">
                <h2>${name}</h2>
            </div>
            `
        }).join('')
        container.innerHTML = template
    })
    categoryBlock.classList.remove('show');
}
function reLoad(){
    window.location.reload()
}

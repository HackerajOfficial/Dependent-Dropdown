console.log('Hackeraj Virus Alert !!!')


const carsDataBox = document.getElementById('cars-data-box')
const carInput = document.getElementById('cars')

const modelsDataBox = document.getElementById('models-data-box')
const modelText = document.getElementById('model-text')

const carText = document.getElementById('car-text')

const btnBox = document.getElementById('btn-box')
const modelInput = document.getElementById('models') 

const alertBox = document.getElementById('alert-box')

const carForm = document.getElementById('car-form')

const csrf = document.getElementsByName('csrfmiddlewaretoken')


$.ajax({
    type: 'GET',
    url: 'cars-json/',
    success: function(response){
        console.log(response.data)
        const carsData = response.data
        carsData.map(item=>{
            const option = document.createElement('div')
            option.textContent = item.name
            option.setAttribute('class', 'item')
            option.setAttribute('data-value', item.name)
            carsDataBox.appendChild(option)
        })
    },
    error: function(response){
        console.log(error)
    }
})

carInput.addEventListener('change', e=>{
    console.log(e.target.value)
    const selectedCar = e.target.value

    modelsDataBox.innerHTML = ""
    modelText.textContent = "Choose a Model"
    modelText.classList.add('default')

    $.ajax({
        type: 'GET',
        url: `cars-json/${selectedCar}/`,
        success: function(response){
            console.log(response.data)
            const modelsData = response.data
            modelsData.map(item=>{
                const option = document.createElement('div')
                option.textContent = item.name
                option.setAttribute('class','item')
                option.setAttribute('data-value', item.name)
                modelsDataBox.appendChild(option)
            })
            modelInput.addEventListener('change', e=>{
                btnBox.classList.remove('not-visible')
            })
        },
        error: function(error){
            console.log(error)
        }
    })
})
carForm.addEventListener('submit', e=>{
    e.preventDefault()
    console.log('submitted')

    $.ajax({
        type: 'POST',
        url: 'create/',
        data: {
            'csrfmiddlewaretoken': csrf[0].value,
            'car': carText.textContent,
            'model': modelText.textContent,
        },
        success: function(response){
            console.log(response)
            alertBox.innerHTML = `
            <div class="ui positive message">
            <i class="close icon"></i>
            <div class="header">
              Success
            </div>
            <p>Your Order has been placed.</p>
          </div>
          `
        },
        error : function(error){
            console.log(error)
            alertBox.innerHTML = `
            <div class="ui negative message">
            <i class="close icon"></i>
            <div class="header">
              ops
            </div>
            <p>Something went wrong.</p>
          </div>
          `
        }
    })
})


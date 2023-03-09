let asideImg = document.querySelector('aside img')
let toggleBtn = document.querySelector('.toggleBtn')
let addons = document.getElementsByClassName('add-on')
let addonPrices = document.getElementsByClassName('addon-price')
let monthlyOption = document.querySelector('.monthly')
let yearlyOption = document.querySelector('.yearly')
let bonusTexts = document.getElementsByClassName('bonus')
let planPrices = document.getElementsByClassName('planPrice')
let nextBtns = document.getElementsByClassName('nextBtn')
let prevBtns = document.getElementsByClassName('prevBtn')
let steps = document.getElementsByClassName('step')
let stepCounts = document.getElementsByClassName('step-count')
let inputs = document.getElementsByClassName('input')
let options = document.getElementsByClassName('option')
let summaryBilling = document.querySelector('.summary .items .billing')
let additionals = document.querySelector('.additionals')
let totalPrice = document.querySelector('.totalPrice h2')
let totalName = document.querySelector('.total .name')
let hiddenPrices = document.getElementsByClassName('hidden-price')
let hiddenBillingPrices = document.getElementsByClassName('hiddenBillingPrice')
let cardPrevBtn = document.querySelector('.cardPrevBtn')
let cardNextBtn = document.querySelector('.cardNextBtn')
let monthly = true
let plan = 'monthly'
let index = 0

toggleBtn.addEventListener('click', function () {
	if (monthly == true) {
		monthly = false
	} else {
		monthly = true
	}

	// if plan is monthly
	if (monthly == true) {
		toggleBtn.classList.remove('yearlyToggle')
		yearlyOption.classList.remove('toggled')
		monthlyOption.classList.add('toggled')
		for (let bonusText of bonusTexts) {
			bonusText.style.display = 'none'
		}
		planPrices[0].innerHTML = '$9/mo'
		planPrices[1].innerHTML = '$12/mo'
		planPrices[2].innerHTML = '$15/mo'
		addonPrices[0].innerHTML = '+$1/mo'
		addonPrices[1].innerHTML = '+$2/mo'
		addonPrices[2].innerHTML = '+$2/mo'
		plan = 'monthly'
		for (let hiddenPrice of hiddenPrices) {
			hiddenPrice.textContent = Number(hiddenPrice.textContent) / 10
		}
		for (let hiddenBillingPrice of hiddenBillingPrices) {
			hiddenBillingPrice.textContent = Number(hiddenBillingPrice.textContent) / 10
		}
	}

	// if plan is yearly
	if (monthly == false) {
		toggleBtn.classList.add('yearlyToggle')
		yearlyOption.classList.add('toggled')
		monthlyOption.classList.remove('toggled')
		for (let bonusText of bonusTexts) {
			bonusText.style.display = 'block'
		}
		planPrices[0].innerHTML = '$90/yr'
		planPrices[1].innerHTML = '$120/yr'
		planPrices[2].innerHTML = '$150/yr'
		addonPrices[0].innerHTML = '+$10/yr'
		addonPrices[1].innerHTML = '+$20/yr'
		addonPrices[2].innerHTML = '+$20/yr'
		plan = 'yearly'
		for (let hiddenPrice of hiddenPrices) {
			hiddenPrice.textContent = Number(hiddenPrice.textContent) * 10
		}
		for (let hiddenBillingPrice of hiddenBillingPrices) {
			hiddenBillingPrice.textContent = Number(hiddenBillingPrice.textContent) * 10
		}
	}

	createBilling()
})

for (let addon of addons) {
	addon.addEventListener('click', function () {
		addon.classList.toggle('addon-selected')
		if (addon.children[0].children[0].getAttribute('checked') !== 'checked') {
			addon.children[0].children[0].setAttribute('checked', 'checked')
			manageAddons()

		} else if (addon.children[0].children[0].getAttribute('checked') == 'checked') {
			addon.children[0].children[0].removeAttribute('checked')
			manageAddons()
		}
	})
}

for (let nextBtn of nextBtns) {
	nextBtn.addEventListener('click', function () {
		if (inputs[0].value !== '' && inputs[1].value !== '' && inputs[2].value !== '') {
			index++
			for (let step of steps) {
				step.classList.add('hidden')
				step.classList.remove('visible')
			}
			steps[index].classList.remove('hidden')
			steps[index].classList.add('visible')
			inputs[0].classList.remove('invalid')
			inputs[0].parentElement.children[0].children[1].style.display = 'none'
			inputs[1].classList.remove('invalid')
			inputs[1].parentElement.children[0].children[1].style.display = 'none'
			inputs[2].classList.remove('invalid')
			inputs[2].parentElement.children[0].children[1].style.display = 'none'

			for (let stepCount of stepCounts) {
				stepCount.classList.remove('active')
			}
			
			if (index >= 1 && window.innerWidth <= 375) {
				cardPrevBtn.style.display = 'block'
			} else if (index < 1 && window.innerWidth > 375) {
				cardPrevBtn.style.display = 'none'
			}

			if (index < 4) {
				stepCounts[index].classList.add('active')
			} else if (index == 4) {
				stepCounts[3].classList.add('active')
			}

		} else if (inputs[0].value == '') {
			inputs[0].classList.add('invalid')
			inputs[0].parentElement.children[0].children[1].style.display = 'block'
		} else if (inputs[1].value == '') {
			inputs[1].classList.add('invalid')
			inputs[1].parentElement.children[0].children[1].style.display = 'block'
		} else if (inputs[2].value == '') {
			inputs[2].classList.add('invalid')
			inputs[2].parentElement.children[0].children[1].style.display = 'block'
		}

		inputs[0].addEventListener('input', function () {
			if (inputs[0].value !== '') {
				inputs[0].classList.remove('invalid')
				inputs[0].parentElement.children[0].children[1].style.display = 'none'
			}
		})

		inputs[1].addEventListener('input', function () {
			if (inputs[1].value !== '') {
				inputs[1].classList.remove('invalid')
				inputs[1].parentElement.children[0].children[1].style.display = 'none'
			}
		})

		inputs[2].addEventListener('input', function () {
			if (inputs[2].value !== '') {
				inputs[2].classList.remove('invalid')
				inputs[2].parentElement.children[0].children[1].style.display = 'none'
			}
		})
	})
}

for (let prevBtn of prevBtns) {
	prevBtn.addEventListener('click', function () {
		index--
		for (let step of steps) {
			step.classList.add('hidden')
			step.classList.remove('visible')
		}
		steps[index].classList.remove('hidden')
		steps[index].classList.add('visible')
	})
}

for (let option of options) {
	option.addEventListener('click', function () {
		options[0].classList.remove('selected')
		options[1].classList.remove('selected')
		options[2].classList.remove('selected')
		option.classList.add('selected')

		createBilling()
	})
}

document.addEventListener('DOMContentLoaded', function () {
	createBilling()
})

function createBilling() {
	for (let option of options) {
		if (option.classList.contains('selected')) {
			summaryBilling.innerHTML = ''
			let billingName = option.children[1].children[0].textContent
			let billingPrice = option.children[1].children[1].textContent
			let hiddenBillingPrice = option.children[1].children[3].textContent
			let billingText = document.createElement('h4')
			let billingContainer = document.createElement('div')
			billingContainer.classList.add('text')
			billingText.innerHTML = billingName
			let changeButton = document.createElement('a')
			changeButton.classList.add('changeBtn')
			changeButton.innerHTML = 'Change'
			let billingPriceText = document.createElement('div')
			billingPriceText.classList.add('price')
			billingPriceText.innerHTML = billingPrice
			billingContainer.appendChild(billingText)
			billingContainer.appendChild(changeButton)
			summaryBilling.appendChild(billingContainer)
			summaryBilling.appendChild(billingPriceText)

			if (plan == 'monthly') {
				totalName.textContent = 'Total (per month)'
				totalPrice.innerHTML = '$' + hiddenBillingPrice + '/mo'
			}

			if (plan == 'yearly') {
				totalName.textContent = 'Total (per year)'
				totalPrice.innerHTML = '$' + hiddenBillingPrice + '/yr'
			}
		}
	}
	document.querySelector('.changeBtn').addEventListener('click', function () {
		index = 1
		for (let step of steps) {
			step.classList.remove('visible')
			step.classList.add('hidden')
		}
		steps[index].classList.add('visible')
		steps[index].classList.remove('hidden')
		for (let stepCount of stepCounts) {
			stepCount.classList.remove('active')
		}
		stepCounts[index].classList.add('active')
	})
}

function manageAddons() {
	additionals.innerHTML = ''
	for (let addon of addons) {
		if (addon.classList.contains('addon-selected')) {
			let additional = document.createElement('div')
			additional.classList.add('additional')
			let additionalName = document.createElement('div')
			additionalName.classList.add('name')
			let additionalPrice = document.createElement('div')
			additionalPrice.classList.add('price')
			let addonName = addon.children[1].children[0].textContent
			let addonPrice = addon.children[2].textContent
			let addonHiddenPrice = addon.children[1].children[2].textContent
			additionalName.innerHTML = addonName
			additionalPrice.innerHTML = addonPrice
			additional.appendChild(additionalName)
			additional.appendChild(additionalPrice)
			additionals.appendChild(additional)
			for (let hiddenBillingPrice of hiddenBillingPrices) {
				if (hiddenBillingPrice.parentElement.parentElement.classList.contains('selected')) {
					let hiddenBillingPriceText = Number(hiddenBillingPrice.textContent)
					let totalPriceText = hiddenBillingPriceText + Number(addon.children[1].children[2].textContent)
					if (plan == 'monthly') {
						totalPrice.textContent = '$' + totalPriceText + '/mo'
					}
					if (plan == 'yearly') {
						totalPrice.textContent = '$' + totalPriceText + '/yr'
					}
				}
			}
		}
	}
}

window.addEventListener('resize', handleLesserWidth)

document.addEventListener('DOMContentLoaded', handleLesserWidth)

function handleLesserWidth() {
	for (let nextBtn of nextBtns) {
		for (let prevBtn of prevBtns) {
			if (window.innerWidth <= 375) {
				asideImg.setAttribute('src', 'assets/images/bg-sidebar-mobile.svg')
				nextBtn.style.display = 'none'
				prevBtn.style.display = 'none'
				cardNextBtn.style.display = 'block'
			} else if (window.innerWidth > 375) {
				asideImg.setAttribute('src', 'assets/images/bg-sidebar-desktop.svg')
				nextBtn.style.display = 'block'
				prevBtn.style.display = 'block'
				cardNextBtn.style.display = 'none'
				cardPrevBtn.style.display = 'none'
			}
		}
	}
}

function calc(){
	let itemLengthValue = document.querySelector('.item_length').value
	let itemLength = parseFloat(itemLengthValue)

	let kupeEgger = 33500
	let kupeTss = 55000
	let kupePlast = 71000

	let raspashnoiEgger = 22500
	let raspashnoiTSS = 44000
	let raspashnoiPlast  = 60000

	let garderobKorpus = 35000
	let garderobDveri = 35000

	let priceFrom = 0
	let priceTo = 0

	// calc optional checkbox
	let optionalPrice = 0
	let itemCheckParent = document.querySelector('.quiz-5')
	let itemCheck = itemCheckParent.querySelectorAll('.item_check')
	itemCheck.forEach(item =>{
		if(item.checked){
			optionalPrice = optionalPrice + (+item.dataset.price)
		}
	})

	// calc by choose in first ques
	let quizParent = document.querySelector('.quiz-2')
	let branch = quizParent.querySelector('.item_rad:checked')
	if(branch.dataset.door == '1'){
		addPrice(kupeEgger, kupeTss, kupePlast)
	} else if(branch.dataset.door == '2'){
		addPrice(raspashnoiEgger, raspashnoiTSS, raspashnoiPlast)
	} else{
		if(branch.dataset.door == '3'){
			optionalPrice = optionalPrice + garderobDveri
		}
		let resultTotalDesc = document.querySelectorAll('.result_total-desc')
		resultTotalDesc.forEach(item =>{
			item.style.display = 'none'
		})
		let branchText = document.querySelector('.branch-text')
		branchText.textContent = 'гардеробной'
		addPrice(garderobKorpus)
	}

	function addPrice(arg1, arg2, arg3){
		let itemPriceFrom1 = document.querySelector('.total_price-from')
		let itemPriceTo1 = document.querySelector('.total_price-to')
		let itemPriceFrom2 = document.querySelector('.tss_price-from')
		let itemPriceTo2 = document.querySelector('.tss_price-to')
		let itemPriceFrom3 = document.querySelector('.plastic_price-from')
		let itemPriceTo3 = document.querySelector('.plastic_price-to')
		discount1 = 0.8
		discount2 = 1.2
		TotalArg1 = (arg1 * itemLength + optionalPrice)
		itemPriceFrom1.textContent = TotalArg1 * discount1
		itemPriceTo1.textContent = TotalArg1 * discount2
		if(arg2){
			TotalArg2 = (arg2 * itemLength + optionalPrice)
			itemPriceFrom2.textContent = TotalArg2 * discount1
			itemPriceTo2.textContent = TotalArg2 * discount2

			TotalArg3 = (arg3 * itemLength + optionalPrice)
			itemPriceFrom3.textContent = TotalArg3 * discount1
			itemPriceTo3.textContent = TotalArg3 * discount2
		}
	}
}
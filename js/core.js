$(document).ready(function() {
	$('.main_slider').slick({
	  dots: true,
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: 300
	})
	$('.about_slider').slick({
	  dots: true,
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: 300
	})
	$('.see_slider').slick({
	  dots: true,
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: 300
	})
	$('.store_slider').slick({
	  dots: true,
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  autoplay: 300
	})

	$('.main_present-wrap').on('click', function(){
		$('.instruction_txt').toggleClass('active')
	})

	// ====== start  дата в акции ======
	var options = {
		month: 'long',
		day: 'numeric',
	};
	let addDays = 7;
	let date = new Date();
	date.setDate(date.getDate() + addDays);
	let m = date.getMonth()+1;
	let d = date.getDate();
	$('.js-year').text(date.getFullYear())
	date = date.toLocaleString("ru", options)
	$('.add-date').html( date );

	// ====== inputmask ======
	$('[type="tel"]').inputmask('+7 (999) 999-99-99');

	// ====== mobile-menu ======
	$('.mobile-arrow').on('click', function(){
		$('.head_top__mobile').slideToggle(300)
		$('.head_top-wrap').toggleClass('active')
	})

	// ====== scroll to ======
	$('.scroll-btn').on('click', function() {
	    let href = $(this).attr('href');
	    $('html, body').animate({
	        scrollTop: $(href).offset().top
	    });
	    return false;
	});

	// item_desc open block
	$('.items').on('click', '.item_desc-btn', function(){
		$(this).next().slideToggle(300)
		$(this).toggleClass('active')
	})

	// запрет ввода цифр, латиницы, ссылок, макс 30 симв
	function checkTxt(item){
		item.value = item.value.replace(/[^а-яё0-9\s\.\,]/gi, '');
		let itemClass = item.className
		$(`.${itemClass}`).prop('maxLength', 30);
		$(`.${itemClass}`).bind("cut copy paste",function(e) {
	    	e.preventDefault();
	    });
	}
	function checkNum(item){
		item.value = item.value.replace(/[^0-9\.]/gi, '');
		let itemClass = item.className
		$(`.${itemClass}`).prop('maxLength', 3);
		$(`.${itemClass}`).bind("cut copy paste",function(e) {
	    	e.preventDefault();
	    });
	}

	// Video
	$(document).on("click", ".video-close", function(){
		videoClose()
	})
	function videoClose(){
		$(".video-open").removeClass("video-open");
		media = document.querySelector('#video_full');
		media.pause();
		media.currentTime = 0;
	}
	$(document).on("click", ".video-close-always", function(){
		$(".video").remove()
	})
	$(document).on("click", ".video-wrap", function(e){
		if($(e.target).is(".video-close") || $(e.target).is(".video-close-always") || $(e.target).is(".video-link") || $(e.target).is(".video-link span") || $(e.target).is(".video-link b") || $(e.target).is(".video-link i")) return false
			var vd = $('.video')
		if(!vd.hasClass("video-open")){
			vd.addClass("video-open");
			media = document.querySelector('#video_full');
			media.play();
		}
	});
	$('.video-link').on('click', function(){
		videoClose()
	})

	// убираем видео на скролле
	var e = $(".video");
    $(window).scroll(function() {
        400 > $(this).scrollTop() ? e.fadeIn(200) : e.fadeOut(200)
    })

    // ===== счетчик===========
	const time = 3000
	const step = 2
	function outNum(num, elem) {
	  let e = document.querySelector(elem)
	  n = 0
	  let t = Math.round(time / (num / step))
	  let interval = setInterval(() => {
	    n = n + step
	    if (n == num) {
	      clearInterval(interval)
	    }
	    e.innerHTML = n
	  }, t)
	};

	function progressLoadFunc(){
		let progressLi = [...document.querySelectorAll('.progress_load')]
		progressLi[0].style.transform = 'translateY(0)'
		progressLi[0].style.opacity = '1'
		setTimeout(function() {
			progressLi[0].classList.remove('progress_load') 
			progressLi[0].classList.add('progress_check')
			progressLi[1].style.transform = 'translateY(0)'
			progressLi[1].style.opacity = '1'
		},1000)
		setTimeout(function() {
			progressLi[1].classList.remove('progress_load') 
			progressLi[1].classList.add('progress_check')
			progressLi[2].style.transform = 'translateY(0)'
			progressLi[2].style.opacity = '1'
		},2100)
		setTimeout(function() {
			progressLi[2].classList.remove('progress_load') 
			progressLi[2].classList.add('progress_check')
		},3100)
		setTimeout(function() {
			let loadNum = [...document.querySelectorAll('.load-num')]
			let loadIcon = document.querySelector('.progress-success')
			loadNum.forEach(item => {
				item.style.opacity = '0'
			})
			loadIcon.style.opacity = '1'
		},3150)

		setTimeout(function() {
			$('.to-contacts').click()
			$('footer').addClass('footer-teather')
		}, 4000)
	}

	// ============= sending form ===========
	$('form').on('submit', function(){
		event.preventDefault();
		if($(this).hasClass('callback_form') || $(this).hasClass('result_callback')){
			$('.btn-callback').click()
			ym(89560481, 'reachGoal', 'consultation_form')
		} else if($(this).hasClass('change_num')){
			$('.btn-change').click()
			ym(89560481, 'reachGoal', 'number_changed')
		} else if($(this).hasClass('form-quiz')){
			ym(89560481, 'reachGoal', 'contacts_sent')
		} else if($(this).hasClass('result_callback')){
			ym(89560481, 'reachGoal', 'engineer_form')
		}
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "send.php",
			data: th.serialize(),
		}).done(function() {
			th.trigger("reset");
			console.log('send is success')
		});
		return false;
	});

	$('.close-modal').on('click', function(){
		let thisParent = $(this).closest('.modal')
		thisParent.find('.fancybox-close-small').click()
	})

	// ============ get contacts page (for mobile) =============
	$('.contacts_radio').on('click', function(){
		$('.contacts_radio').removeClass('active')
		let thisAttr = $(this).attr('data-contact')
		$('.contacts_radio[data-contact$=' + thisAttr + ']').addClass('active')
		$('.contacts_radio[data-contact$=' + thisAttr + '] input').prop('checked', true)
	})

	// ============== change ptel input =============
	$('.input_tel').on('input', function(){
		$('.input_tel').not($(this)).val($(this).val())
		let userPhone = $(this).val()
		if(!/_/.test(userPhone) && userPhone != ''){
			if($(this).hasClass('result_input')){
				$('.send').prop('disabled', false)
			} else{
				$('.send').not('.change_btn').prop('disabled', false)
			}
		} else{
			$('.send').prop('disabled', true)
		}
		if($(this).hasClass('input_quiz')){
			$('.old-number').val($(this).val())
		}
	})


	// ======================= 
	// ========== ============= quiz-functional ============== =========
	// ======================= 

	// ======== print text to desc ============
	function printText(elemClass, text){
		new TypeIt(`${elemClass}`, {
			strings: [`${text}`],
			speed: 30,
			cursor: false,
		}).go();
	}

	// typeit radio
	$('.items').on('change', '.item_rad', function(){
		let radioIndex = $(this).attr('data-item')
		let radioIndexNext = $(this).attr('data-quiz')
		let radioIndexChoose = +$(this).attr('data-choose') - 1
		let radioValue = $(this).val()
		let typeitTxt = $(".typeit_txt[data-desc$=" + radioIndex + "]")
		let typeitParrent = '.quiz-' + radioIndex
		typeitTxt.html(radioValue)
		printText(typeitParrent + ' .typeit', radioValue)
		// go to next quiz
		changeByChoose(radioIndexChoose, radioIndexNext)
		quizChange(radioIndex, radioIndexNext)
		if($(this).hasClass('js-data-choose')){
			$('.item_length').val($('.js-data-choose').attr('data-val'))
		}
		let itemParent = $(this).closest('.quiz')
		let item = itemParent.find('.item')
		item.addClass('item__deactive')
		setTimeout(function(){
			$('.item__deactive').removeClass('item__deactive')
		},1500)
		let radioParent = $(this).closest('.item')
		radioParent.removeClass('item__deactive')
		if(+radioIndexNext < 7){
			ym(89560481, 'reachGoal', 'Q' + +radioIndexNext)
		}
	})

	// typeit checkbox
	$('.checks').on('change', '.item_check', function(){
		// if(document.querySelectorAll('.item_check:checked').length > 0){
		// 	$('.checks').find('.btn-next').removeClass('default')
		// } else{
		// 	$('.checks').find('.btn-next').addClass('default')
		// }
		let checkIndex = $('.item_check').index($(this)) + 1
		let radioValue = $(this).val()
		// printText()
		typeitCh($(this), checkIndex, radioValue)
	})
	$('.checks').on('input', '.item_text', function(){
		checkTxt(this)
		let thisParent = $(this).closest('.item')
		let thisCheck = thisParent.find('.item_check')
		let typitCh = thisParent.find('.typeit_ch')
		if($(this).val() != ''){
			if(thisCheck.prop('checked') != true){
				thisCheck.click()
			}
		} else{
			if(thisCheck.prop('checked') == true){
				thisCheck.click()
			}
		}
	})

	function typeitCh(item, itemIndex, itemValue, textClass){
		if(!textClass){
			textClass = ''
		}
		if(item.prop('checked')){
			$('.typeit_ch-wrap').append(`<div class="typeit_ch ${textClass}" data-typeit-ch="${itemIndex}">${itemValue}</div>`)
			$(`.typeit_ch[data-typeit-ch=${itemIndex}]`).slideDown(300)
		} else{
			$(`.typeit_ch[data-typeit-ch=${itemIndex}]`).slideUp(300)
			setTimeout(function(){
				$(`.typeit_ch[data-typeit-ch="${itemIndex}"]`).remove()
			},300)
		}
	}
	// typeit checkbox input
	$('.item_name-input').on('input', function(){
		// validation
		checkNum(this)
		if((this.value[0] == '0') || (this.value[0] == '.')){
			this.value = 1
		}
		// -/validation
		let inputVal = $('.item_name-input').val()
		let itemsParrent = $(this).closest('.quiz')
		let itemRadio = itemsParrent.find('.item_rad')
		itemRadio.prop('checked', false)
		let itemNameParrent = $(this).closest('.item_label')
		itemCheck = itemNameParrent.children('.item_check')
		if(itemCheck.prop('checked', false)){
			itemCheck.prop('checked', true)
		}
		if($(this).val() == ''){
			itemCheck.prop('checked', false)
			itemCheck.val('')
			$('.js-typeit_input').text('')
			itemsParrent.find('.btn-next').addClass('default')
		} else{
			itemCheck.val($(this).val())
			$('.js-typeit_input').text($(this).val())
			itemsParrent.find('.btn-next').removeClass('default')
			$('.item_length').val(`${$(this).val()}`)
		}
	})

	// =========== btn click =================
	$('.btn-quiz').on('click', function(){
		let currentQuiz = $(this).attr('data-quiz')
		let nextQuiz = +currentQuiz + 1
		let prevQuiz = +currentQuiz - 1
		if($(this).hasClass('btn-next') && !$(this).hasClass('btn-result')){
			quizChange(currentQuiz, nextQuiz)
			ym(89560481, 'reachGoal', 'Q' + +nextQuiz)
			// changeByChoose
			let choose = +$('.item_rad.js-data-choose').attr('data-choose') - 1
			changeByChoose(choose, nextQuiz)
		} else if($(this).hasClass('btn-result')){
			quizChange(currentQuiz, nextQuiz)
			$('footer').addClass('footer-teather')
			// change choose-type txt
			chooseTypeTxtChange()
			setTimeout(function() {
				outNum(100, ".load-counter")
				let progressLoad = document.querySelector('.load')
				progressLoad.classList.add('load-active')
				progressLoadFunc()
				$('.teather').css('opacity','1')
			},1400)
			ym(89560481, 'reachGoal', 'contacts')
			if(document.querySelectorAll('.item_check:checked').length == 0){
				$('.result_total .typeit_ch-wrap').text('Не выбрано')
				$('.item_check-hidden').val('Не выбрано')
			}
		} else if($(this).hasClass('btn-done')){
			$('#quiz').css('display','none')
			$('#result').css('display','block')
			setTimeout(function(){
				$('#result').css('opacity','1')
	    		$('.quiz-send').click()
			},20)
			$('footer').removeClass('footer-teather')
	    	calc()
	    	$('html, body').animate({
		        scrollTop: $('#result').offset().top
		    });
	    	return false;
		} else if($(this).hasClass('btn-back')){
			if(($(this).attr('data-quiz') == '3') && $(this).closest('.quiz').hasClass('quiz-4')){
				quizChange(4, prevQuiz)
        		$('.quiz_nav-li').eq(3).removeClass('active')
			} else{
				quizChange(currentQuiz, prevQuiz)
			}
			// clear choose inputs
			let prevParent = $('.quiz-' + prevQuiz)
			let currentParent = $('.quiz-' + currentQuiz)
			let prevInputs = $('.quiz-' + prevQuiz).find('input')
			let currentInputs = $('.quiz-' + currentQuiz).find('input')
			prevInputs.prop('checked', false)
			currentInputs.prop('checked', false)
			prevParent.find('.typeit').html('')
			currentParent.find('.typeit').html('')
			$('.item_name-input').val('')
		}
	})

	// ====== change choose-type func ==========
	function chooseTypeTxtChange(){
		let choosedInput = $('.quiz-1 .item_rad:checked').attr('data-choose')
		let chooseType = ''
		if(choosedInput == '1'){
			$('.choose-type').text('шкафа-купе')
		} else if(choosedInput == '2'){
			$('.choose-type').text('распашного шкафа')
		} else if(choosedInput == '3'){
			$('.choose-type').text('прихожей')
		} else {
			$('.choose-type').text('гардеробной')
		}
	}

	// ====== quiz change func ==========
	function quizChange(arg1, arg2){
		setTimeout(function() {
			$('.quiz-' + arg1).css({'opacity':'0'})
			if(arg1 < arg2){
				$('.quiz_nav-li').eq(arg1).addClass('active')
				if(arg1 == '4'){
					$('.quiz_nav-li').eq(3).addClass('active')
				}
				if(+arg1 < 5){
					$('.pagination-current').text(+arg1 + 1)
				}
			} else{
				$('.quiz_nav-li').eq(arg2).removeClass('active')
				$('.pagination-current').text(+arg2)
			}
			let scrollAddHight = $('.quiz_title').outerHeight() - 20
			$('html, body').animate({
		        scrollTop: $('#quiz').offset().top + scrollAddHight
		    });
		}, 1000)
		setTimeout(function() {
			$('.quiz-' + arg1).hide()
			$('.quiz-' + arg2).css({'display':'block'})
		},1300)
		setTimeout(function() {
			$('.quiz-' + arg2).css({'opacity':'1'})
		},1350)
	}

	// ======= change html in items by choose =========
	let items = {
		quiz2: [
			// купе
			{choose0: [
				{name: "Встроенный", data: "1", img: "1-1", door: '1', txt: 'Встраивается в нишу либо угол комнаты. Шкаф без задней стенки'},
				{name: "Отдельностоящий", data: "2", img: "1-2", door: '1'},
			]},
			// распашной
			{choose1: [
				{name: "Встроенный", data: "3", img: "2-1", door: '2', txt: 'Встраивается в нишу либо угол комнаты. Шкаф без задней стенки'},
				{name: "Отдельностоящий", data: "4", img: "2-2", door: '2'},
			]},
			// прихожие
			{choose2: [
				{name: "Купе", data: "5", img: "3-1", door: '1'},
				{name: "Распашные", data: "6", img: "3-2", door: '2'},
			]},
			// гардероб
			{choose3: [
				{name: "Двери купе", data: "7", img: "4-1", door: '3'},
				{name: "Распашная дверь", data: "7", img: "4-2", door: '3'},
				{name: "Гардеробная без дверей", data: "7", img: "4-3", door: '4'},
				{name: "Ещё не решил", data: "7", img: "4-4", door: '4'},
			]},
		],
		quiz3: [
			// купе - встроенный
			{choose0: [
				{name: "Зеркало", data: "1", img: "1-1"},
				{name: "Пескоструйный рисунок", data: "1", img: "1-2"},
				{name: "Фотопечать", data: "1", img: "1-3"},
				{name: "Вставки под  дерево", data: "1", img: "1-4"},
				{name: "Геометрические вставки", data: "1", img: "1-5"},
				{name: "Вставки под кожу", data: "1", img: "1-6"},
				{name: "Тонированное зеркало", data: "1", img: "1-7"},
				{name: "Текстура бетон", data: "1", img: "1-8"},
				{name: "Пока не решил", data: "1", img: "1-1"},
			]},
			// купе - отдельностоящий
			{choose1: [
				{name: "Зеркало", data: "2", img: "2-1"},
				{name: "Пескоструйный рисунок", data: "2", img: "2-2"},
				{name: "Фотопечать", data: "2", img: "2-3"},
				{name: "Вставки под  дерево", data: "2", img: "2-4"},
				{name: "Геометрические вставки", data: "2", img: "2-5"},
				{name: "Вставки под кожу", data: "2", img: "2-6"},
				{name: "Тонированное зеркало", data: "2", img: "2-7"},
				{name: "Текстура бетон", data: "2", img: "2-8"},
				{name: "Пока не решил", data: "2", img: "2-1"},
			]},
			// распашной - встроенный
			{choose2: [
				{name: "Классика", data: "3", img: "3-1"},
				{name: "Глянцевое покрытие", data: "3", img: "3-2"},
				{name: "Зеркало", data: "3", img: "3-3"},
				{name: "Тонированное стекло", data: "3", img: "3-4"},
				{name: "Открытые полки", data: "3", img: "3-5"},
				{name: "Врезные ручки", data: "3", img: "3-6"},
				{name: "Текстура бетон", data: "3", img: "3-7"},
				{name: "Текстура дерево", data: "3", img: "3-8"},
				{name: "Пока не решил", data: "3", img: "3-1"},
			]},
			// распашной - отдельностоящий
			{choose3: [
				{name: "Классика", data: "4", img: "4-1"},
				{name: "Глянцевое покрытие", data: "4", img: "4-2"},
				{name: "Зеркало", data: "4", img: "4-3"},
				{name: "Тонированное стекло", data: "4", img: "4-4"},
				{name: "Открытые полки", data: "4", img: "4-5"},
				{name: "Врезные ручки", data: "4", img: "4-6"},
				{name: "Текстура бетон", data: "4", img: "4-7"},
				{name: "Текстура дерево", data: "4", img: "4-8"},
				{name: "Пока не решил", data: "4", img: "4-1"},
			]},
			// прихожие - купе
			{choose4: [
				{name: "Классика", data: "5", img: "5-1"},
				{name: "Глянцевое покрытие", data: "5", img: "5-2"},
				{name: "Зеркало", data: "5", img: "5-3"},
				{name: "Пескоструйный рисунок", data: "5", img: "5-4"},
				{name: "Тонированное зеркало", data: "5", img: "5-5"},
				{name: "Фотопечать", data: "5", img: "5-6"},
				{name: "Вставки под  дерево", data: "5", img: "5-7"},
				{name: "Вставки под  кожу", data: "5", img: "5-8"},
				{name: "Комбинация цветов", data: "5", img: "5-9"},
				{name: "Текстура бетон", data: "5", img: "5-10"},
				{name: "Пока не решил", data: "5", img: "5-1"},
			]},
			// прихожие - распашной
			{choose4: [
				{name: "Зеркало", data: "6", img: "6-1"},
				{name: "Глянцевое покрытие", data: "6", img: "6-2"},
				{name: "Матовое покрытие", data: "6", img: "6-3"},
				{name: "Скрытые ручки", data: "6", img: "6-4"},
				{name: "Текстура дерева", data: "6", img: "6-5"},
				{name: "Врезные ручки", data: "6", img: "6-6"},
				{name: "Текстура бетон", data: "6", img: "6-7"},
				{name: "Классика", data: "6", img: "6-8"},
				{name: "Пока не решил", data: "6", img: "6-1"},
			]},
		],
		quiz4: [
		],
		quiz5: [
			// купе - встроенный - доп 11
			{choose0: [
				{name: "Хранение обуви", data: "1", img: "1-1", price: "10000"},
				{name: "Подстветка", data: "1", img: "1-2", price: "15000"},
				{name: "Хранение для аксессуаров", desc:"галстуков, ремней", data: "1", img: "1-4", price: "8500"},
				{name: "Выдвижные ящики", data: "1", img: "1-5", price: "7500"},
				{name: "Бытовая зона", data: "1", img: "1-6", txt: "Для гладильной доски, пылесоса, рыболовного или охотничьего снаряжения", price: "10000"},
				{name: "Пантограф", data: "1", img: "1-7", txt: "Гардеробный лифт для хранения одежды в подпотолочном пространстве", price: "7000"},
				{name: "Другое", data: "1", img: "", price: "0"},
			]},
			// купе - отдельностоящий - доп 12
			{choose1: [
				{name: "Хранение обуви", data: "1", img: "1-1", price: "10000"},
				{name: "Подстветка", data: "1", img: "1-2", price: "15000"},
				{name: "Хранение для аксессуаров", desc:"галстуков, ремней", data: "1", img: "1-4", price: "8500"},
				{name: "Выдвижные ящики", data: "1", img: "1-5", price: "7500"},
				{name: "Бытовая зона", data: "1", img: "1-6", txt: "Для гладильной доски, пылесоса, рыболовного или охотничьего снаряжения", price: "10000"},
				{name: "Пантограф", data: "1", img: "1-7", txt: "Гардеробный лифт для хранения одежды в подпотолочном пространстве", price: "7000"},
				{name: "Другое", data: "1", img: "", price: "0"},
			]},
			// распашной - встроенный - доп 21
			{choose2: [
				{name: "Хранение обуви", data: "1", img: "1-1", price: "10000"},
				{name: "Подстветка", data: "1", img: "1-2", price: "15000"},
				{name: "Хранение для аксессуаров", desc:"галстуков, ремней", data: "1", img: "1-4", price: "8500"},
				{name: "Выдвижные ящики", data: "1", img: "1-5", price: "7500"},
				{name: "Бытовая зона", data: "1", img: "1-6", txt: "Для гладильной доски, пылесоса, рыболовного или охотничьего снаряжения", price: "10000"},
				{name: "Пантограф", data: "1", img: "1-7", txt: "Гардеробный лифт для хранения одежды в подпотолочном пространстве", price: "7000"},
				{name: "Другое", data: "1", img: "", price: "0"},
			]},
			// распашной - отдельностоящий - доп 22
			{choose3: [
				{name: "Хранение обуви", data: "1", img: "1-1", price: "10000"},
				{name: "Подстветка", data: "1", img: "1-2", price: "15000"},
				{name: "Хранение для аксессуаров", desc:"галстуков, ремней", data: "1", img: "1-4", price: "8500"},
				{name: "Выдвижные ящики", data: "1", img: "1-5", price: "7500"},
				{name: "Бытовая зона", data: "1", img: "1-6", txt: "Для гладильной доски, пылесоса, рыболовного или охотничьего снаряжения", price: "10000"},
				{name: "Пантограф", data: "1", img: "1-7", txt: "Гардеробный лифт для хранения одежды в подпотолочном пространстве", price: "7000"},
				{name: "Другое", data: "1", img: "", price: "0"},
			]},
			// прихожие - купе - доп 31
			{choose4: [
				{name: "Хранение обуви", data: "1", img: "5-1", price: "10000"},
				{name: "Зеркало", data: "1", img: "5-2", price: "2500"},
				{name: "Выдвижные ящики", data: "1", img: "5-3", price: "7500"},
				{name: "Бытовая зона", data: "1", img: "5-4", txt: "Для гладильной доски, пылесоса, рыболовного или охотничьего снаряжения", price: "10000"},
				{name: "Мягкий пуф", data: "1", img: "5-5", price: "0"},
				{name: "Подстветка", data: "1", img: "5-6", price: "15000"},
				{name: "Рейки", desc:"в зоне для верхней одежды", data: "1", img: "5-7", price: "9000"},
				{name: "Каретная стяжка", desc: "в зоне для верхней одежды", data: "1", img: "5-8", price: "5000"},
				{name: "Пантограф", data: "1", img: "5-9", txt: "Гардеробный лифт для хранения одежды в подпотолочном пространстве", price: "7000"},
				{name: "Другое", data: "1", img: "", price: "0"},
			]},
			// прихожие - распашной - доп 32
			{choose5: [
				{name: "Хранение обуви", data: "1", img: "5-1", price: "10000"},
				{name: "Зеркало", data: "1", img: "5-2", price: "2500"},
				{name: "Выдвижные ящики", data: "1", img: "5-3", price: "7500"},
				{name: "Бытовая зона", data: "1", img: "5-4", txt: "Для гладильной доски, пылесоса, рыболовного или охотничьего снаряжения", price: "10000"},
				{name: "Мягкий пуф", data: "1", img: "5-5", price: "0"},
				{name: "Подстветка", data: "1", img: "5-6", price: "15000"},
				{name: "Рейки", desc:"в зоне для верхней одежды", data: "1", img: "5-7", price: "9000"},
				{name: "Каретная стяжка", desc: "в зоне для верхней одежды", data: "1", img: "5-8", price: "5000"},
				{name: "Пантограф", data: "1", img: "5-9", txt: "Гардеробный лифт для хранения одежды в подпотолочном пространстве", price: "7000"},
				{name: "Другое", data: "1", img: "", price: "0"},
			]},
			// прихожие - распашной - доп 4
			{choose6: [
				{name: "Обувница", data: "1", img: "7-1", price: "10000"},
				{name: "Зеркало", data: "1", img: "7-3", price: "2500"},
				{name: "Хранение мелочей", data: "1", img: "7-4", price: "8500"},
				{name: "Выдвижные ящики", data: "1", img: "7-5", price: "7500"},
				{name: "Хранение аксессуаров", desc:" галстуков, ремней", data: "1", img: "7-6", price: "8500"},
				{name: "Пантограф", data: "1", img: "7-7", txt:"Гардеробный лифт для хранения одежды в подпотолочном пространстве", price: "7000"},
				{name: "Подстветка", data: "1", img: "7-8", txt:"Подстветка в штангах или в корпусе шкафа. Возможно включение света от датчика движения", price: "15000"},
				{name: "Гладильная доска", data: "1",  img: "7-9", price: "15000"},
				{name: "Бытовая зона", data: "1", img: "7-10", txt: "Для гладильной доски, пылесоса, рыболовного или охотничьего снаряжения", price: "10000"},
			]},
		],
	}

	let themes={
		theme2: [
			{choose0: {name: "Тип шкафа", theme: "Шкаф будет встроенным или отдельностоящим?"}},
			{choose0: {name: "Тип шкафа", theme: "Шкаф будет встроенным или отдельностоящим?"}},
			{choose0: {name: "Тип шкафа", theme: "Какие дверцы будут у шкафа в прихожей?"}},
			{choose0: {name: "Двери", theme: "Вам понадобятся двери в гардеробную?"}}
		],
		theme3: [
			{choose0: {name: "Фасад", theme: "Выберите фасад дверей"}}
		],
		theme4: [
			{choose0: {name: "Длина", theme: "Укажите примерную длину шкафа (м.п.)"}},
			{choose0: {name: "Длина", theme: "Укажите примерную длину гардеробной (м.п.)"}}
		],
		theme5: [
			{choose0: {name: "Опции", theme: "Выберите, что из перечисленного вам понадобится"}}
		]
	}

	function changeByChoose(choose, quiz){
        let itemHtml = ''
		let currentQuiz = quiz - 2
		let itemWrap = $(`.quiz-${quiz}`).find('.items')
		let itemClass = 'item'
		let itemDescBtnClass = ''
		let itemInputType = 'radio'
		let itemInputClass = 'item_rad'
		let itemNameClass = 'item_name'
		let nextQuiz = +quiz + 1
		// change quiz title and name of inputs
		let themesDataAll
		if(currentQuiz == 0){
			themesDataAll = Object.values(themes)[currentQuiz][choose]
		} else if(currentQuiz == 2){
			themesDataAll = Object.values(themes)[currentQuiz][0]
			if(choose >= 6){
				themesDataAll = Object.values(themes)[currentQuiz][1]
			}
		} else if(currentQuiz < 5){
			themesDataAll = Object.values(themes)[currentQuiz][0]
		}
		let themesData = Object.values(themesDataAll)[0]
		// change By Branch
		if($('.quiz-1 .item_rad:checked').attr('data-branch') == '2'){
        	nextQuiz = 4
			$('.quiz-3 .items').html('')
        	$('.quiz-4 .btn-back').attr('data-quiz', '3')
        	$('.result_total__branch').css('display','none')
        } else{
        	$('.quiz-4 .btn-back').attr('data-quiz', '4')
        	$('.result_total__branch').css('display','block')
        }
		$(`.typeit_desc[data-desc-title=${quiz}]`).text(`${themesData.name} -`)
        if(quiz != '4'){
			let thisItem = Object.values(items)[currentQuiz][choose]
			let itemCount = Object.values(thisItem)[0].length
	        for(i = 0; i < itemCount; i++){
				let item = Object.values(thisItem)[0][i]
				let itemTxt = ''
				let itemDesc = ''
				let itemDataPrice = ''
				// add class item__big
				if(item.name == 'Пока не решил'){
					itemClass = 'item item__big'
				}
				// add class item__big-check
				if(quiz == '5'){
					itemInputType = 'checkbox'
					itemInputClass = 'item_check'
					itemNameClass = 'item_name item_name__check'
					itemDataPrice = `data-price="${item.price}"`
				} else{
					itemInputType = 'radio'
					itemInputClass = 'item_rad'
					itemNameClass = 'item_name'
				}
				// hide/show btn of item desc
				if(item.txt){
					itemTxt = item.txt
					itemDescBtnClass = 'item_desc-btn'
				} else{
					itemDescBtnClass = 'dn'
				}
				// add data-door for calc
				let dataDoor = ''
				if(quiz == '2'){
					dataDoor = `data-door="${item.door}"`
				}
				// add index of name for sending
				let optionIndex = ''
				if(themesData.name == 'Опции'){
					optionIndex = `[${i}]`
				}
				// add name-desc txt
				if(item.desc){
					itemDesc = item.desc
				}
				let itemImgHtml = `<a href="img/quiz/${quiz}-${item.img}-big.jpg" class="item_img" data-fancybox>
						<img src="img/quiz/${quiz}-${item.img}.jpg" alt="">
					</a>`
				if(item.name == 'Другое'){
					itemImgHtml = `<div class="item_textarea">
						<div class="item_textarea-in">
							<textarea class="item_text" name="Опции[99]" value="" placeholder="Напишите свой вариант"></textarea>
						</div>
					</div>`
				}
	        	itemHtml = itemHtml + `
				<div class="${itemClass}">
					${itemImgHtml}
					<div class="item_content">
						<label class="item_label">
							<input class="${itemInputClass}" name="${themesData.name}${optionIndex}" type="${itemInputType}" value="${item.name}" data-item="${quiz}" data-quiz="${nextQuiz}" data-choose="${item.data}" ${itemDataPrice} ${dataDoor}>
							<span class="${itemNameClass}">${item.name} <i>${itemDesc}</i></span>
						</label>
						<div class="${itemDescBtnClass}"></div>
						<div class="item_desc">
							<p>${itemTxt}</p>
						</div>
					</div>
				</div>
	            `
	        }
			itemWrap.html(itemHtml)
		} else{
			$('.js-data-choose').attr('data-choose', choose + 1)
			$('.js-data-choose').val('Стандарт (2 м.п.)')
			$('.js-data-choose').attr('data-val', 2)
			if(choose >= "6"){
				$('.js-data-choose').val('Стандарт (3 м.п.)')
				$('.js-data-choose').attr('data-val', 3)
			}
		}
		$(`.quiz-${quiz} .quiz-title`).text(themesData.theme)
	}
})
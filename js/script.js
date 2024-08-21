document.addEventListener("DOMContentLoaded", () => {

    function contactUsForm() {

        // работа с выбором задач
        let tasks = document.querySelectorAll(".task")
        let taskList = []
        taskList.push('Разработка') // Начальное значение

        tasks.forEach(task => {
            task.addEventListener("click", () => {
                if (task.classList.contains("active")) {
                    task.classList.remove('active')
                    taskList = taskList.filter(item => item !== task.innerHTML)
                } else {
                    task.classList.add('active')
                    taskList.push(task.innerHTML)
                }
                // console.log(taskList)
            })
        })


        // работа с инпутами

        let inputs = Array.from(document.querySelectorAll('.input')); // берем все инпуты
        inputs.pop() // удаляем от туда последний элемент (fileInput)

        inputs.forEach(input => {
            // Обработчик события клика
            // input.addEventListener("click", () => {
            //     // // даем класс тому элементу на который нажали
            //     // input.classList.add("filled");

            // // Проверка всех input элементов
            // inputs.forEach(otherInput => {
            //     if(otherInput == input) return // если это тот же элемент, то мы не проверяем его
            //     // проверяем каждый элемент и если он пуст, то убираем класс
            //     if (otherInput.value === '') {
            //         otherInput.classList.remove('filled');
            //     }
            // });
            // });
            // Обработчик события ввода в инпут
            input.addEventListener("input", () => {
                // проверяем если он пуст, то убираем класс, если не пуст — добавляем
                if (input.value == '') {
                    input.classList.remove('filled');
                    input.classList.add('required');
                } else {
                    input.classList.add('filled');
                    input.classList.remove('required');
                }

                // Проверка всех input элементов
                inputs.forEach(otherInput => {
                    if (otherInput.value === '') {
                        otherInput.classList.remove('filled');
                    } else {
                        otherInput.classList.add('filled');
                    }
                });
            })
            input.addEventListener("focusout", () => {
                if (input.value == '') {
                    input.classList.add('required');
                } else {
                    input.classList.remove('required');
                }
            })
            // при первой отрисовке инпута, проверяем пустой или нет
            if (input.value !== '') {
                input.classList.add('filled')
            }
        });


        // инпут телефона
        let telInput = document.getElementById("telInput");
        const maskOptions = {
            mask: '+{7}(000)000-00-00'
        };
        const mask = IMask(telInput, maskOptions);

        // инпут файла

        let fileInput = document.getElementById("fileInput")
        let fileLabel = document.querySelector(".inputFile")
        fileInput.addEventListener('change', function () {
            if (fileInput.files.length !== 0) {
                fileLabel.classList.add('filled')
                document.querySelector('.inputPreview__filename').innerHTML = fileInput.files[0].name;
            } else {
                fileLabel.classList.remove("filled")
            }
        });

        document.querySelector(".deleteFileLogo").addEventListener('click', () => {
            fileInput.value = '';
            fileLabel.classList.remove("filled")
        })


        let form = document.querySelector(".contactUsForm")

        form.addEventListener('submit', (e) => {
            document.getElementById("taskList").value = taskList
            // console.log(document.getElementById("taskList").value)
            e.preventDefault()
        })




        let remToPx = 40 * parseFloat(getComputedStyle(document.documentElement).fontSize); // 20rem в пикселях
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".contactUsForm",
                start: "bottom 90%",
                end: "+=" + remToPx,
                pin: ".contactUs",
                scrub: true,
            }
        })
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: ".contactUsForm",
            start: "top bottom",
            end: "bottom 30%",
            onEnter: () => {
                unfixFooter();
            },
            onEnterBack: () => {
                unfixFooter();
            },
            onLeaveBack: () => {
                unfixFooter()
            },
            onLeave: () => {
                fixFooter();
            }
        })
        function fixFooter() {
            document.querySelector(".footer").style.setProperty("margin-top", "15rem")
        }
        function unfixFooter() {
            document.querySelector(".footer").style.setProperty("margin-top", "50rem")
        }

        // исправляем проблемы gsap контейнера 
        setTimeout(() => {
            // document.querySelector(".pin-spacer").style.setProperty("height", `fit-content`);
            document.querySelector(".pin-spacer").style.setProperty("padding-bottom", `0`);
            document.querySelector(".contactUs").style.setProperty("margin-bottom", 0)
        }, 100) // если querySelector = null, значит он не успел прогрузится, увеличить setTimeout

    }

    contactUsForm()


    function projectsSlider() {
        const swiper = new Swiper('.projectsSlider', {
            slidesPerView: 'auto',
            speed: 700,
            spaceBetween: 0,
            pagination: {
                el: '.projectsSlider__navigation',
                clickable: true,
            },
        })
    }

    projectsSlider()



    function partnersAnimation() {
        let tl = gsap.timeline()
        let speedFactor = 1;
        let animationFrame;
        tl.to(".partnersRow1", { duration: 20, x: "-100%", repeat: -1, ease: "linear" }, 0)
            .fromTo(".partnersRow2",
                { x: "-100%" },
                { x: "0%", duration: 30, repeat: -1, ease: "linear" }, 0
            )
            .to(".partnersRow3", { duration: 25, x: "-100%", repeat: -1, ease: "linear" }, 0);

        tl.to(".partnersRow", {
            scrollTrigger: {
                trigger: ".partnersRow",
                start: "top-80% top",
                end: "top top",
                onEnter: () => isInScrollArea = true,
                onLeave: () => isInScrollArea = false,
                onEnterBack: () => isInScrollArea = true,
                onLeaveBack: () => isInScrollArea = false,
            }
        });

        let isInScrollArea = false;
        let isScrolling = false;

        if (visualViewport.width > 1024) {
            window.addEventListener('wheel', handleScroll);
        } else {
            window.addEventListener("pointermove", handleScroll)
        }
        function handleScroll(){
            if (isInScrollArea) {
                if (!isScrolling) {
                    isScrolling = true;
                    adjustSpeed(true);
                }
                decreaseSpeed(false);
            }
        }
        window.addEventListener('scroll', () => isScrolling = false);


        function adjustSpeed() {
            cancelAnimationFrame(animationFrame); // Остановить уменьшение скорости
            speedFactor += 3;
            if (speedFactor >= 8) return
            tl.timeScale(speedFactor);
            animationFrame = requestAnimationFrame(()=>adjustSpeed());
            // console.log("Speeding up", speedFactor);
        }

        function decreaseSpeed() {
            let interval
            if (visualViewport.width > 1024) {
                interval = setInterval(decrease, 50)
            } else (
                interval = setInterval(decrease, 100)
            )
            function decrease() {
                speedFactor -= 1;
                if (speedFactor <= 1) {
                    speedFactor = 1;
                    clearInterval(interval);
                }
                tl.timeScale(speedFactor);
                // console.log("Slowing down", speedFactor);
            }
        }


        function appendCopyRow(row) {
            const children = Array.from(row.children); // Клонируем все дочерние элементы
            children.forEach(child => {
                const clone = child.cloneNode(true); // Создаем клон каждого дочернего элемента
                row.appendChild(clone); // Добавляем клон в этот же .partners-row
            });
        }
        const partnersRows = document.querySelectorAll(".partnersRow");

        partnersRows.forEach(row => {
            appendCopyRow(row); // Для каждого .partners-row добавляем копии дочерних элементов
        });

        const thirdRow = partnersRows[2]; // Третий элемент (индексация с 0)
        appendCopyRow(thirdRow); // Добавляем еще одну копию для третьего элемента

        document.querySelectorAll('.partnersRow').forEach((element, index) => {
            if (index === 2) {
                element.style.setProperty("width", `${element.offsetWidth / 4}px`);
            } else {
                element.style.setProperty("width", `${element.offsetWidth / 2}px`);
            }
        })
    }
    partnersAnimation()


})
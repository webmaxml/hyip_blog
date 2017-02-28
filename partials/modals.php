<div class="modals">

    <div class="modals__overlay" data-modal-window="refback">
        <div class="refbackModal">
            <button class="modals__close" type="button">
                <i class="fa fa-close modals__close-icon"></i>
            </button>
            <h1 class="refbackModal__header">Заказать рефбек</h1>
            <p class="refbackModal__text">Для заказа рефбека, Вы должны зарегестрироваться в проекте по нашим партнерским ссылкам. Также обязательно ознакомтесь с <a class="refbackModal__link" href="/">правилами выплат рефбеков</a>.</p>
            <form class="refbackModal__form">
                <input class="refbackModal__input" type="text" placeholder="Название проекта">
                <input class="refbackModal__input" type="text" placeholder="Логин в проекте">
                <input class="refbackModal__input" type="text" placeholder="Вклад, $">
                <div class="refbackModal__select-wrap">
                    <select class="refbackModal__select" name="paySystem">
                        <option value="perfectMoney">PerfectMoney</option>
                        <option value="payeer">Payeer</option>
                        <option value="bitcoin">Bitcoin</option>
                        <option value="advancedCash">Advanced Cach</option>
                        <option value="qiwi">Qiwi</option>
                        <option value="yandex">Яндекс.Деньги</option>
                        <option value="nixMoney">NixMoney</option>
                    </select>
                    <div class="refbackModal__pseudo-select">
                        <div class="refbackModal__pseudo-select-value"></div>
                        <i class="fa fa-chevron-down refbackModal__pseudo-select-icon"></i>
                        <ul class="refbackModal__pseudo-option-box">
                            <li class="refbackModal__pseudo-option" data-value="perfectMoney">PerfectMoney</li>
                            <li class="refbackModal__pseudo-option" data-value="payeer">Payeer</li>
                            <li class="refbackModal__pseudo-option" data-value="bitcoin">Bitcoin</li>
                            <li class="refbackModal__pseudo-option" data-value="advancedCash">Advanced Cach</li>
                            <li class="refbackModal__pseudo-option" data-value="qiwi">Qiwi</li>
                            <li class="refbackModal__pseudo-option" data-value="yandex">Яндекс.Деньги</li>
                            <li class="refbackModal__pseudo-option" data-value="nixMoney">NixMoney</li>
                        </ul>
                    </div>
                </div>
                <input class="refbackModal__input" type="text" placeholder="Номер кошелька">
                <input class="refbackModal__input" type="text" placeholder="Email">
                <button class="refbackModal__submit">Заказать</button>
            </form>
        </div>
    </div>

    <div class="modals__overlay" data-modal-window="addHyip">
        <div class="addHyipModal">
            <button class="modals__close" type="button"><i class="fa fa-close modals__close-icon"></i></button>
            <h1 class="addHyipModal__header">Добавить проект</h1>
            <p class="addHyipModal__text">Проекты проходят модерацию и за нами остается право добавлять проект в каталог или нет </p>
            <form class="addHyipModal__form">
                <input class="addHyipModal__input" type="text" placeholder="URL">
                <button class="addHyipModal__submit">Добавить</button>
            </form>
        </div>
    </div>

    <div class="modals__overlay" data-modal-window="mobileMenu">
        <div class="mobileMenuModal">
            <button class="modals__close" type="button"><i class="fa fa-close modals__close-icon"></i></button>
            <ul class="mobileMenuModal__nav">
                <li class="mobileMenuModal__nav-item">
                    <a class="mobileMenuModal__nav-link" href="/">Блог</a>
                </li>
                <li class="mobileMenuModal__nav-item">
                    <a class="mobileMenuModal__nav-link" href="/hyip_index.html">Хайпы</a>
                </li>
                <li class="mobileMenuModal__nav-item">
                    <button class="mobileMenuModal__nav-link" type="button" data-modal-trigger="addHyip">Добавить хайп</button>
                </li>
                <li class="mobileMenuModal__nav-item">
                    <button class="mobileMenuModal__nav-link" type="button" data-modal-trigger="refback">Рефбек</button>
                </li>
                <li class="mobileMenuModal__nav-item">
                    <a class="mobileMenuModal__nav-link" href="/">Реклама</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="modals__overlay" data-modal-window="registration">
        <div class="regModal">
            <button class="modals__close" type="button">
                <i class="fa fa-close modals__close-icon"></i>
            </button>
            <h1 class="regModal__header">Регистрация</h1>
            <form class="regModal__form" method="post" action="">
                <?php wp_nonce_field( 'hyip_reg' ); ?>
                <div class="regModal__input-wrap">
                    <input class="regModal__input" id="regLogin" type="text" name="login" placeholder="Логин">
                </div>
                <div class="regModal__input-wrap">
                    <input class="regModal__input" id="regEmail" type="email" name="email" placeholder="Email">
                </div>
                <div class="regModal__input-wrap">
                    <input class="regModal__input" id="regPwd" type="password" name="password" placeholder="Пароль">
                </div>
                <div class="regModal__input-wrap">
                    <input class="regModal__input" id="regPwdRepeat" type="password" name="password_repeat" placeholder="Повтор пароля">
                </div>
                <ul class="regModal__error-container" id="regErrorContainer"></ul>
                <div class="regModal__submit-wrap">
                    <button class="regModal__submit">Регистрация
                        <div class="regModal__loader-wrap">
                            <img class="regModal__loader" src=<?php echo get_template_directory_uri() . '/assets/spin.svg?6fdf9e7aec0d45c5078bb2e7719bfb7a'?> alt="Загрузка...">
                        </div>
                    </button>
                </div>
                <div id="responseErrorContainer" class="regModal__res-error-container"></div>
            </form>
        </div>
    </div>

</div>
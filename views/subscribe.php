<div class="subscribe">
    <div class="sectionHeader">
        <div class="sectionHeader__line-left"></div>
        <h1 class="sectionHeader__text">Подписаться на рассылку</h1>
        <div class="sectionHeader__line-right"></div>
    </div>
    <form class="subscribe__form">
        <input type="text" name="name" class="subscribe__input" placeholder="Имя" required>
        <input type="email" name="email" class="subscribe__input" placeholder="Email" required> 
        <ul id="subscribe-error" class="subscribe__error-container"></ul>     
        <button class="subscribe__submit">
            <span class="subscribe__submit-text">Подписаться</span>
            <img class="subscribe__submit-loader" src=<?php echo $this->ajax_loader_src; ?> alt="Загрузка...">
        </button>
    </form>
</div>
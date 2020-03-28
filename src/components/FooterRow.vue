<template>
    <!-- <footer -->
    <footer class="row" id="footer">
        <div class="col-12">
            <p class="text-center">
                <a href="https://github.com/mjkhonline/" title="Github Profile">
                    <img id="github_logo" src="../assets/imgs/github-logo.png" alt="github logo">
                    Github Profile
                </a>
            </p>
            <p class="text-center">this web application is designed for the E-Payment course at the AmirKabir University
                of Technology<br/> Department of Management, Science and Technology
            </p>
        </div>
        <div id="footer_bar" class="col-12">
            <p class="text-center">Developer with <i class="material-icons text-danger">favorite</i> by
                <a href="tel:+989362879026" title="Call Developer">mjkhonline</a>
            </p>
        </div>
    </footer>
    <!-- footer/> -->
</template>

<script>
    export default {
        name: "FooterRow"
    }
</script>

<style lang="scss" scoped>
    a {
        transition: all 200ms;
        color: white;
        text-decoration: none;
        &:hover {
            background-color: #ffc107;
            color: black;
            padding: 0.8em;
        }
    }
    #footer_bar{
        color: white;
    }
    #github_logo {
        position: relative;
        top:-3px;
        width: 30px;
        height: 30px;
    }
</style>
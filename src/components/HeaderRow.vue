<template>
 <!-- <header -->
    <header id="app-header" class="row">
        <div class="col-12 col-sm-8 col-md-6 p-5">
            <h1 class="mb-3">
                <img id="header_logo" src="../assets/imgs/logo.png" alt="logo">
                JS Encryptor
            </h1>
            <p>AES-256 with GCM mode of operation encryption/decryption tool.<br/>
                Powered by SJCL. Based on OpenSSL's aes_core.c.
            </p>
            <p class="note">
                The Stanford Javascript Crypto Library is a project by the Stanford Computer Security Lab to build a
                secure,
                powerful, fast, small, easy-to-use, cross-browser library for cryptography in Javascript.<br/>
                <a href="https://github.com/bitwiseshiftleft/sjcl" target="_blank">https://github.com/bitwiseshiftleft/sjcl</a>
            </p>
        </div>
    </header>
    <!-- header/> -->
</template>

<script>
    export default {
        name: "HeaderRow"
    }
</script>

<style lang="scss" scoped>
    #header_logo{
        width: 35px;
        height: 35px;
        position: relative;
        top:-5px;
    }
</style>
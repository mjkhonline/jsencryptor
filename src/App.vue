<template>
    <div id="app">
        <header-row/>
        <!-- <main content -->
        <div id="main-content" class="row justify-content-center mb-5">
            <encryption-card @encryptionFormSubmitted="encrypt"/>
            <decryption-card ref="decrCard" @decryptionFormSubmitted="decrypt"/>
        </div>
           <div class="row justify-content-center my-5" id="resultRow">
                <transition  name="fade" type="transition" mode="out-in">
                <result-card v-if="resultFor === 'encryption'" key="resulftForEncryption">
                    <p class="note">
                        <b>Authentication Tag:</b> {{cipherData.adata}}<br/>
                        <b>Ciphered Message:</b> {{cipherData.ct}}
                    </p>
                    <p>
                        <b>Additional Data:</b><br/>
                        iv: {{cipherData.iv}}<br/>
                        salt: {{cipherData.salt}}<br/>
                        v: {{cipherData.v}}, iter: {{cipherData.iter}}, KS: {{cipherData.ks}}, TS: {{cipherData.ts}},
                        Mode:
                        {{cipherData.mode}}, cipher: {{cipherData.cipher}}<br/>
                    </p>
                    <p>successfully encrypted @{{new Date().toString()}}</p>
                    <button type="button" class="btn btn-info" @click="copyToDecryptionForm">
                        Copy Data to Decryption Form
                    </button>
                </result-card>
                <result-card v-if="resultFor === 'decryption'" key="resulftForDecryption">
                    <p class="note">
                        <b>Decrypted Secret Message:</b><br/>
                        {{decryptedData}}<br/>
                        <b>AAD:</b><br/>
                        {{authenticationData}}
                    </p>
                    <p v-if="authenticationData"><i class="material-icons text-success">beenhere</i>
                        The authenticity of the message is confirmed.</p>
                    <p>successfully decrypted @{{new Date().toString()}}</p>
                </result-card>
                </transition>
            </div>
        <!-- main content/> -->
        <footer-row/>
    </div>
</template>

<script>
    import encryptionCard from "./components/EncryptionCard";
    import ResultCard from "./components/ResultCard";
    import AesInterface from "./components/AesInterface";
    import DecryptionCard from "./components/DecryptionCard";
    import HeaderRow from "./components/HeaderRow";
    import FooterRow from "./components/FooterRow";
    import VueScrollTo from 'vue-scrollto';
    import {failAlert} from "./alerts";

    export default {
        name: 'jsEncryptor',
        data() {
            return {
                cipherData: {},
                decryptedData: {},
                authenticationData: '',
                resultFor: ''
            }
        },
        methods: {
            encrypt(data) {
                const options = {
                    mode: "gcm",
                    ks: 256,
                    salt: data.salt,
                    adata: data.aad,
                    iter: 1000
                };
                this.cipherData = AesInterface.methods.encrypt(data.password, data.plainText, options);
                this.resultFor = 'encryption';
                VueScrollTo.scrollTo('#resultRow', 500, {'easing': 'ease-in-out'});
            },
            decrypt(data) {
                const options = {
                    ct: data.cipheredText,
                    iv: data.iv,
                    salt: data.salt,
                    adata: data.aad,
                    mode: "gcm",
                    cipher: 'aes',
                    ks: 256,
                    ts: 64,
                    iter: 1000,
                    v: '1',
                };
                try {
                    this.decryptedData = AesInterface.methods.decryptByPassword(data.password, options);
                    this.authenticationData = AesInterface.methods.decodeAuthenticationData(data.aad);
                    this.resultFor = 'decryption';
                    VueScrollTo.scrollTo('#resultRow', 500, {'easing': 'ease-in-out'});
                } catch (e) {
                    failAlert.fire({
                        title: "Decryption Unsuccessful!",
                        text: e
                    });
                    this.resultFor = '';
                }
            },
            copyToDecryptionForm() {
                const cd = this.cipherData;
                this.$refs.decrCard.getFormData(cd.ct, cd.iv, cd.salt, cd.adata);
                VueScrollTo.scrollTo('#decryptionGrid', 500, {'easing': 'ease-in-out'});
            }
        },
        computed: {},
        components: {
            encryptionCard,
            ResultCard,
            AesInterface,
            DecryptionCard,
            FooterRow,
            HeaderRow
        }
    }
</script>

<style lang="scss">
    @use "./assets/sass/base";

    .fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 500ms;
    }
    .fade-leave{}
    .fade-leave-active{
        transition: opacity 300ms;
        opacity: 0;
    }

</style>

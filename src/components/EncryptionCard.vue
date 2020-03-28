<template>
    <div class="col-12 col-sm-10 col-md-4 grid" id="encryptionGrid">
        <div class="grid-header">
            <h2>Encryption</h2>
            <i class="material-icons md-36 grid-icon">lock</i>
            <p>Fill in below fields and click encrypt.</p>
        </div>
        <div class="grid-content">
            <form class="my-4" autocomplete="off" @submit.prevent="submit">
                <div class="input-group mb-3">
                    <input :type="isPasswordVisible ? 'text':'password'" class="form-control" placeholder="Password"
                           aria-label="User Password" ref="passwordInput" v-model="formInput.password"
                           @focusout="generateKey"
                           :class="{'is-invalid':errors.password}">
                    <div class="input-group-append clickable" @click="changePasswordVisibility">
                        <div class="input-group-text">
                            <i class="material-icons">visibility{{isPasswordVisible ? '':'_off'}}</i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Salt (optional)" readonly
                           aria-label="Salt" :value="encodedSalt" @focusout="generateKey">
                    <div class="input-group-append clickable" @click="generateSalt">
                        <div class="input-group-text">
                            Generate <i class="material-icons">autorenew</i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" ref="formKeyInput"
                           placeholder="Key will be auto generated using PBKDF2"
                           aria-label="Generated Key" :value="formInput.key" :class="{'is-invalid':errors.key}">
                    <div class="input-group-append clickable" @click="keyCopy">
                        <div class="input-group-text">
                            Copy <i class="material-icons">file_copy</i>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="AAD (optional)"
                           aria-label="additional authenticated data" v-model="formInput.aad">
                </div>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Plain Text</span>
                    </div>
                    <textarea class="form-control" aria-label="User Plain Text"
                              v-model="formInput.plainText"
                              :class="{'is-invalid':errors.plainText}"></textarea>
                </div>
                <div class="input-group">
                    <button type="submit" class="btn btn-lg btn-success">
                        Encrypt <i class="material-icons md-18">lock</i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import AesInterface from "./AesInterface";
    import sjcl from "../assets/js/sjcl-lib";

    export default {
        name: "EncryptionCard",
        components: {
            AesInterface
        },
        data() {
            return {
                isPasswordVisible: false,
                formInput: {
                    password: '',
                    key: '',
                    salt: '',
                    aad: '',
                    plainText: ''
                },
                errors: {
                    password: false,
                    key: false,
                    plainText: false
                }
            }
        },
        methods: {
            generateKey() {
                let password = this.formInput.password;
                if (password) {
                    this.formInput.key = AesInterface.methods.generateKey(password, this.formInput.salt);
                }
            },
            generateSalt() {
                this.formInput.salt = AesInterface.methods.generateSalt();
                this.generateKey();
            },
            formValidation() {
                let valid = true;
                if (!this.formInput.password) {
                    this.errors.password = true;
                    valid = false;
                }
                if (!this.formInput.key) {
                    this.errors.key = true;
                    valid = false;
                }
                if (!this.formInput.plainText) {
                    this.errors.plainText = true;
                    valid = false;
                }
                return valid;
            },
            submit() {
                this.errors.password = false;
                this.errors.key = false;
                this.errors.plainText = false;
                if (this.formValidation()) {
                    this.$emit('encryptionFormSubmitted', this.formInput);
                }
            },
            changePasswordVisibility() {
                this.isPasswordVisible = !this.isPasswordVisible;
                this.$refs.passwordInput.focus();
            },
            keyCopy() {
                const elem = this.$refs.formKeyInput;
                elem.select();
                elem.setSelectionRange(0, 99999);
                document.execCommand("copy");
            }
        },
        computed: {
            encodedSalt() {
                return sjcl.codec.hex.fromBits(this.formInput.salt);
            }
        }
    }
</script>

<style lang="scss" scoped>
    textarea {
        resize: vertical;
        max-height: 200px;
        min-height: 100px;
    }
</style>
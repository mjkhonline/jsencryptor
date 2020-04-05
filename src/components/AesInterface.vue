<script>
    import sjcl from "../assets/js/sjcl-lib"

    export default {
        name: "AesInterface",
        methods: {
            encrypt(password, plaintText, options) {
                return JSON.parse(sjcl.encrypt(password, plaintText, options));
            },
            decryptByKey(key, cipheredData) {
                cipheredData = JSON.stringify(cipheredData);
                let keyBitArray = sjcl.codec.hex.toBits(key);
                return sjcl.decrypt(keyBitArray, cipheredData);
            },
            decryptByPassword(password, cipheredData) {
                cipheredData = JSON.stringify(cipheredData);
                return sjcl.decrypt(password, cipheredData);
            },
            generateKey(password, salt) {
                return sjcl.codec.hex.fromBits(sjcl.misc.pbkdf2(password, salt, 1000, 256)).toUpperCase();
            },
            generateSalt() {
                return sjcl.random.randomWords(2);
            },
            decodeAuthenticationData(adata) {
                return sjcl.codec.utf8String.fromBits(sjcl.codec.base64.toBits(adata));
            }

        }
    }
</script>
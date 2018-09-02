<template>
    <div class="template-wrapper">
        <h1 class="short-title">{{ title }}</h1>
        <div class="container">
            <div class="action-wrapper">
                <input class="short-input" placeholder="Place your url here ..." v-model="url">
                <div id="loading-bar-spinner" class="spinner"><div v-show="isLoading" class="spinner-icon"></div></div>
                <a class="short-link" v-if="shortURl" :href="shortURl" target="_blank"> {{shortURl}}</a>
                <button :disabled="isLoading" class="short-button" @click="generateUrl()">Create Dynamic Url</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import api_key from './config'
import db from './firebaseconfig'

export default {
    data () {
        return {
            title: 'Digital Media URL Generator',
            url: '',
            link: false,
            key: api_key.secret,
            shortURl: '',
            api: 'https://digitalmedia.page.link/?link=',
            isLoading: false,
        }
    },
    methods: {
        generateUrl () {
            this.shortURl = ''
            this.isLoading = true            
            const requesteObject = { longDynamicLink: this.api + this.url} 
            axios({
            method: 'post',
            url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${this.key}`,
            data: requesteObject
            }).then(res => {                
                this.isLoading = false
                this.shortURl = res.data.shortLink
                this.storeData(this.url, this.shortURl)
                this.getdata()
            })
             .catch(err => {
                this.isLoading = false
                console.log(err);
            }) 
       },
       getdata () {
          db.collection("links").get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    });
                });
       },
       storeData (oldUrl, newUrl) {
            db.collection("links").add({
                linkBefore: oldUrl,
                linkAfter: newUrl
                })
                .then(function() {
                console.log("Document successfully written!");
             })
       },
    },
    mounted () {   
        this.getdata()
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');

.template-wrapper {
    background-color: #4D5061;
    height: 100%;
    width: 100%;
    margin: 0px;
    padding: 0px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;

}
.container { 
    width: 100%;
    max-width: 650px;
    height: 275px;
    border-radius: 4px;
    background-color: #E9EDDE;
    align-self: center;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);


}
.action-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-content: center;
    justify-content: space-between;
    padding: 0px 0px;
    margin: 0px 0px;
}
.short-title {
    color: white;
    font-family: 'Ubuntu', sans-serif;
    align-self: center;
}
.short-input {
    text-align: center;
    font-family: 'Ubuntu', sans-serif;
    border-radius: 5px;
    font-size: 16px;
    padding: 3px 0px;
    margin: 10px 15px;
    outline: none;
    height: 30px;
    border: white;
}
.short-input:focus {
    box-shadow: 0 0 5px #E7E247;
    border: 0.6px solid #E7E247;
}
.short-button {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 300;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 0px;
    margin: 10px 15px;
    outline: none;
    background-color: #5C80BC;
    color: white;
    border: none;
}
.short-button:hover {
    outline: none;
    transition: all 0.3s ease 0s;
    transform: scale(0.9);
    background-color: #476391;
}
.short-link {
    text-decoration: none;
    color: #5C80BC;
    align-self: center;
}
.short-link:hover {
    align-self: center;
    color: #476391;

}
#loading-bar-spinner.spinner {
    align-self: center;
    left: 50%;
    margin-left: -20px;
    top: 50%;
    margin-top: -20px;
    position: absolute;
    z-index: 19 !important;
    animation: loading-bar-spinner 400ms linear infinite;
}

#loading-bar-spinner.spinner .spinner-icon {
    width: 40px;
    height: 40px;
    border:  solid 4px transparent;
    border-top-color:  #E7E247 !important;
    border-left-color: #E7E247 !important;
    border-radius: 50%;
}

@keyframes loading-bar-spinner {
  0%   { transform: rotate(0deg);   transform: rotate(0deg); }
  100% { transform: rotate(360deg); transform: rotate(360deg); }
}
</style>
(()=>{var h=Object.defineProperty;var l=(n,t,e)=>t in n?h(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var c=(n,t,e)=>(l(n,typeof t!="symbol"?t+"":t,e),e);var a=class{constructor(t,e,s){this.server=t,this.signal=e,this.password=s}async get(t){this.password&&(t.includes("?")?t+="&pwd="+this.password:t+="?pwd="+this.password);try{let e=await fetch(new URL(t,this.server),{signal:this.signal});if(e.status===200)return await e.text();throw new Error('unexpected server response to not match "200". Server says "'.concat(await e.text(),'"'))}catch(e){throw console.error(e),new Error("Cannot communicate with the server")}}async needPassword(){return await this.get("needpassword")==="true"}async newSession(){return await this.get("newsession")}async editSession(t,e,s){let r=await this.get("editsession?id="+encodeURIComponent(t)+(e?"&httpProxy="+encodeURIComponent(e):"")+"&enableShuffling="+(s?"1":"0"));if(r!=="Success")throw new Error("unexpected response from server. received ".concat(r))}async sessionExists(t){let e=await this.get("sessionexists?id="+encodeURIComponent(t));switch(e){case"exists":return!0;case"not found":return!1;default:throw new Error("unexpected response from server. received ".concat(e))}}async deleteSession(t){if(await this.sessionExists(t)){let e=await this.get("deletesession?id="+t);if(e!=="Success"&&e!=="not found")throw new Error("unexpected response from server. received ".concat(e))}}async shuffleDict(t){let e=await this.get("api/shuffleDict?id="+encodeURIComponent(t));return JSON.parse(e)}},o=class{constructor(t){c(this,"baseDictionary","0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~-");c(this,"shuffledIndicator","_rhs");t||(t=this.generateDictionary()),this.dictionary=t}mod(t,e){return(t%e+e)%e}generateDictionary(){let t="",e=this.baseDictionary.split("");for(;e.length>0;)t+=e.splice(Math.floor(Math.random()*e.length),1)[0];return t}shuffle(t){if(t.startsWith(this.shuffledIndicator))return t;let e="";for(let s=0;s<t.length;s++){let r=t.charAt(s),i=this.baseDictionary.indexOf(r);r==="%"&&t.length-s>=3?(e+=r,e+=t.charAt(++s),e+=t.charAt(++s)):i===-1?e+=r:e+=this.dictionary.charAt(this.mod(i+s,this.baseDictionary.length))}return this.shuffledIndicator+e}unshuffle(t){if(!t.startsWith(this.shuffledIndicator))return t;t=t.slice(this.shuffledIndicator.length);let e="";for(let s=0;s<t.length;s++){let r=t.charAt(s),i=this.dictionary.indexOf(r);r==="%"&&t.length-s>=3?(e+=r,e+=t.charAt(++s),e+=t.charAt(++s)):i===-1?e+=r:e+=this.baseDictionary.charAt(this.mod(i-s,this.baseDictionary.length))}return e}};var f={};f={rhInteract:async function(n,t){let e=new a(n);await fetch(n),localStorage.getItem("rammerhead_session")&&await e.sessionExists(localStorage.getItem("rammerhead_session"))?(await fetch(new URL(localStorage.getItem("rammerhead_session"),n))).status===403&&localStorage.removeItem("rammerhead_session"):localStorage.removeItem("rammerhead_session");let s;switch(localStorage.getItem("rammerhead_session")){case null:case void 0:case"null":case"undefined":s=await e.newSession();break;default:s=localStorage.getItem("rammerhead_session")}localStorage.setItem("rammerhead_session",s),await e.editSession(s,!1,!0);let r=await e.shuffleDict(s),i=new o(r);return new URL("".concat(s,"/").concat(i.shuffle(t)),n)},rhDecrypt:async function(n,t){let e=new a(n),s=localStorage.getItem("rammerhead_session"),r=await e.shuffleDict(s);return new o(r).unshuffle(t)}};})();
//# sourceMappingURL=rhHelper.js.map

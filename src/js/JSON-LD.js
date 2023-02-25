const createElement = (data)=> {
    let script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
}

export const Archive = {
    letterCount(text) {
        return text.trim().length;
    },
    structure(data) {
        const _this = this
        const { title, description, logo, url, images, article, metaDescription, keywords} = data;
        const wordCount = _this.letterCount(article);

        const jsonld = {
            "@context": "http://schema.org", 
            "@type": "Article",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://google.com/article"
            },
            "headline": title || "Medidor de Anel",
            "alternativeHeadline": description || "",
            "image": logo || "",
            "author": {
                "@type": "Person",
                "name": "Fernando Aquistapace"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Medidor de Anel",
                "logo": {
                    "@type": "ImageObject",
                    "url": logo || ""
                }
            },
            "genre": "Rings", 
            "keywords": keywords || "",
            "wordcount": wordCount || "",
            "url": url || "",
            "datePublished": "2023-02-25T07:33:17.976Z",
            "dateCreated": "2023-02-25T07:33:17.976Z",
            "dateModified": "2023-02-25T07:33:17.976Z",
            "description": metaDescription || "",
            "articleBody": article || "",
            "image": images
        }

        return jsonld;
    },
    getData(){
        const title = document.querySelector('article header h1')?.innerText;
        const description = document.querySelector('article header p')?.innerText;
        const article = document.querySelector('article')?.innerText;
        const keywords = document.querySelector('meta[name="keywords"]')?.content;
        const metaDescription = document.querySelector('meta[name="description"]')?.content;
        const logo = document.querySelector('.logo img')?.src;
        let images = document.querySelectorAll('article img');
        const url = window.location.href;

        images = images?.length > 0 ? Array.from(images).map(e=> e.src) : [];
        const obj = {
            title: title,
            description: description,
            article: article,
            keywords: keywords,
            metaDescription: metaDescription,
            url: url,
            logo: logo,
            images: images
        }

        return obj;
    },
    checkHasArticle() {
        const article = document.querySelector('article');
        if(article) return true;
        return false
    },
    init() {
        console.log('START');
        if(this.checkHasArticle()) {
            const data = this.getData();
            const jsonld = this.structure(data);
            console.log('jsonld', jsonld);
           
            createElement(jsonld)
        }
    }
}






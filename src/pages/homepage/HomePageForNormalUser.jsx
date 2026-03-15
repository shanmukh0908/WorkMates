import styles from "./HomePage.module.css";

export default function HomePageForNormalUser({ children }){
return (
    <div className={styles.SearchWorkmateBox} >
        <div className={styles.imageBox1}>
            <img src="/webp/tmdec281.webp" alt="" />
            <img src="/webp/tmdec283.webp" alt="" />
            <img src="/webp/tmdec282.webp" alt="" />
            <img src="/webp/tmdec288.webp" alt="" />
            <img src="/webp/tmdec285.webp" alt="" />
            <img src="/webp/tmdec289.webp" alt="" />
            <img src="/webp/tmdec2810.webp" alt="" />
            <img src="/webp/tmdec2811.webp" alt="" />
            <img src="/webp/tmdec2812.webp" alt="" />
            <img src="/webp/tmdec2813.webp" alt="" />
            <img src="/webp/tmdec2814.webp" alt="" />
        </div>

        <div className={styles.descriptionBox}>
            <p className={styles.description1}>
                Be it a small task or a big project, Work Mates helps you find the right workmate — quick, reliable & negotiable 
            </p>
            <p className={styles.description1}>
                 Find trusted workmates near you 
            </p>
            <p className={styles.description1}>
               Filter by skill, distance, availability, and ratings.
            </p>
        </div>
        {children}
    </div>
)
}

export  function HomePageForNormalUser2({ children }){
return (
    <div className={styles.PostTaskBox} >
        <div className={styles.imageBox2}>
            <img src="/webp/tm29dec11.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec2.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec3.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec12.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec5.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec6.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec7.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec8.webp" alt="" className={styles.TaskImage2}/>
            <img src="/webp/tm29dec9.webp" alt="" className={styles.TaskImage2}/>
        </div>

        <div className={styles.CallToActionBox2}>
        <div className={styles.descriptionBox2}>
            <p className={styles.description1}>
                No complicated searching.
            </p>
            <p className={styles.description1}>
                 Post your task and let trusted nearby Taskmates respond. 
            </p>
        </div>
        {children}
        </div>
    </div>
)
}
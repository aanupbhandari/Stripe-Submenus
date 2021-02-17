import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [...document.querySelectorAll('.link-btn')];
const subMenu = document.querySelector('.submenu');
const hero = document.querySelector('.hero');
const nav = document.querySelector('.nav');
// hide/show sideabar
toggleBtn.addEventListener('click', () => {
  sidebarWrapper.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarWrapper.classList.remove('show');
});

// set sidebar
sidebar.innerHTML = sublinks.map((item)=>{
    const {links, page} = item;
    return `<article>
            <h4>${page}</h4> 
            <div class="sidebar-sublinks">
            ${links.map((link)=>{
                return `<a href = "${link.url}">
                <i class="${link.icon}"></i>${link.label}</a>`
            }).join('')}
            </div>
            </article>
    `
}).join("")

// set Submenus for bigger screen

linkBtns.forEach((btn)=>{
  btn.addEventListener('mouseover', function(e){
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom - 3;
    const tempPage = sublinks.find(({ page })=> page === text);
    console.log(tempPage);
      if (tempPage) {
        const {page, links} = tempPage;
        subMenu.classList.add('show');
        subMenu.style.left = `${center}px`;
        subMenu.style.top = `${bottom}px`;
        subMenu.innerHTML = 
        `<section>
            <h4>${page}</h4>
            <div class = "submenu-center col-2">
            ${links.map((link)=>{
              return `<a href = "${link.url}">
              <i class = "${link.icon}"></i>${link.label}</a>`
            }).join("")}
            </div>
          </section>`
            

      }
        
    
    
  })
})

// hiding the submenu whenerver the user hover around except the links

hero.addEventListener('mouseover',function(){
  subMenu.classList.remove('show')
})

nav.addEventListener('mouseover',function(e){
  if (!e.target.classList.contains('link-btn')) {
    subMenu.classList.remove('show')
  }
  
})
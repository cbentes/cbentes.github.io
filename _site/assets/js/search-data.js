// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-publications",
          title: "publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "post-a-maze",
        
          title: "A-Maze",
        
        description: "Creating mazes for my kids",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/a-maze/";
          
        },
      },{id: "post-jepa-for-audio-encoding",
        
          title: "JEPA for audio encoding",
        
        description: "JEPA architecture for audio encoding",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/jepa-for-audio/";
          
        },
      },{id: "post-template",
        
          title: "Template",
        
        description: "Small collection of templates",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/template/";
          
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/cbentes", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/carlosbentes", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=ON-fNh0AAAAJ", "_blank");
        },
      },{
        id: 'social-kaggle',
        title: 'Kaggle',
        section: 'Socials',
        handler: () => {
          window.open("https://www.kaggle.com/cbentes", "_blank");
        },
      },{
        id: 'social-medium',
        title: 'Medium',
        section: 'Socials',
        handler: () => {
          window.open("https://medium.com/@cbentes", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },];

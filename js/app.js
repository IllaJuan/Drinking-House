document.addEventListener('scroll' , () => { 
    const header=document.querySelector('.navcolor');
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    });

    document.addEventListener('scroll' , () => { 
        const header=document.querySelector('.sidebar');
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        });
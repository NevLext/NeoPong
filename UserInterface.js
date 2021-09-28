class UserInterface
{
    constructor() {}

    toggleManual()
    {
        let manual = document.getElementById("manual");
        this.toggleDisplay(manual);
    }

    toggleStartText()
    {
        let startText = document.getElementById("start-text");
        this.toggleDisplay(startText);
    }

    toggleDisplay(element)
    {
        if(element.style.display == "none")
            element.style.display = "block";
        else
            element.style.display = "none";
    }
}
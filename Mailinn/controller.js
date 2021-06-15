//controller


//Funksjon for å velge stolpe ved onclick. Valgt stolpe får svart ramme.
//Valgt stolpe får oppdatert tekst; Valgt stolpe (x)
//Når valgt stolpe skal ikke andre stolper være valgt 

function choosePillar(id) 
{   
    if (selectedPillar == id) selectedPillar = null;
    else selectedPillar = id;

    CheckIfChosen();
    

    show();
}

function CurrentPillar()
{
    return selectedPillar == null ? "Ingen" : selectedPillar;
}

function CheckIfChosen()
{
     selectedPillar == null ? status = "disabled" : status = "enabled";
}

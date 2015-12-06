#pragma strict

var colArr = new Array();
var N =3;
var xRandom = 0;
var changeColor = false;
var clickedButtonId = 0;
var counter = 0;
var y = 150;
var button = false;
var b = 0;
function Start () {
	for(var i=0;i<10;i++)
	{
		colArr.Add(Color(Random.value, Random.value, Random.value));	
	}			
}

function OnGUI() {
	var levelNum = N-2;
	GUI.Label(Rect(150,25,100,50),"Level: "+levelNum);
	var buttonBlinked = false;
	if (changeColor == true)
	{
		GUI.backgroundColor = Color.green;
	    buttonBlinked = GUI.Button(Rect(xRandom,y,50,50),"");	   
 	}	
 	
	GUI.backgroundColor = Color.red;
	var play = GUI.Button(Rect(15,15,100,50),"Play");	
    
    ButtonPopulation();
    
	if(play)	
	{				
		Blinking();
	}
}

function Blinking(){
	 RandomPositionCalculation();
	 yield WaitForSeconds(.3);
	 changeColor = true;
	 yield WaitForSeconds(1);
	 changeColor = false;	
}

function RandomPositionCalculation(){
	var butId = Random.Range(1,N+1);
	xRandom = ((butId-1)*60+50);
}

function ScoreCounter ()
{	
	b = (xRandom+60)/60;
	   		
	if(clickedButtonId == b)
	{		
		counter +=1;
		Debug.Log("Counter " + counter);		    		
	}
}

function ButtonPopulation()
{	
	
	var x=50;
	
	for(var i=0;i<N;i++)
    {			    
	    GUI.backgroundColor = colArr[i];
    	button = GUI.Button(Rect(x,y,50,50),"");  
    	if(button)
    	{    	
    		clickedButtonId=i+1;
    		
    		if(counter<2*N)   
    		{	    			
    			ScoreCounter();
    			if(counter<2*N && clickedButtonId == b)	
    				Blinking();
    		}
    	}    	   	
    	x += 60;	    	
    }    
    if(clickedButtonId != b)
    {
		//Debug.Log("looser");				
		GUI.Label(Rect(50,220,100,50),"You failed");
		var tryAgain = GUI.Button(Rect(50,300,100,50), "Try again");
		if(tryAgain)
		{
			clickedButtonId = 0;
			b=0;
			counter=0;
			N=3;
			ButtonPopulation();
			Blinking();
			
			
		}
    }
    if(counter == 2*N)
	{			
		var levelNum = N-2;			
		GUI.Label(Rect(50,220,500,50), "You won level " + levelNum +" To go to the next level press Continue.");
		var continueButton = GUI.Button(Rect(50,300,100,50), "Continue");
		if(continueButton)
		{
			counter=0;		
			N+=1;
			ButtonPopulation();
			Blinking();
		}
	} 
}


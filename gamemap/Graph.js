

function Graph()
{
	this.n			= 0;
	this.edgesl		= [];
	this.edgesr		= [];
	
	this.neibs		= [];
}

Graph.prototype.Build = function (s)
{	
	var re = /^[0-9]+:([0-9]+-[0-9]+,)*([0-9]+-[0-9]+)$/g
	if(!re.test(s)) {alert("Wrong graph code!"); return;}
	
	var sp = s.split(":");
	
	this.n = Number( sp[0] );
	
	this.edgesl = [];
	this.edgesr = [];
	this.neibs	= [];
	
	for(i=0; i<this.n; i++) this.neibs.push([]);

	var ed = sp[1].split(",");
	var a, b, e;
	for(i=0; i<ed.length; i++)
	{
		e = ed[i].split("-");
		a = Number(e[0])-1;
		b = Number(e[1])-1;
		
		this.edgesl.push(a);
		this.edgesr.push(b);
		this.neibs[a].push(b);
		this.neibs[b].push(a);
		if(a >= this.n || b >= this.n) alert("Wrong edge number!");
	}
}

function Grapher2D(){
	this.vertices=[];
	this.repulsion=200;
	this.attraction=0.06;
	this.damping=0.5;
	this.stable=false;
	this.physics=true;
	this.is3D=false;
	this.dragged=null;
	this.graph=new Graph
	}
	
Grapher2D.prototype.MakeGraph=function(b){
	this.graph.Build(b);
	this.vertices=[];
	var a,c;
	for(i=0;i<this.graph.n;i++)
	b=-100+Math.random()*200,
	a=-100+Math.random()*200,
	c=-100+Math.random()*200,
	v=new Vertex(b,a,this.is3D?c:0),
	this.vertices.push(v);this.stable=false
	};
	

Grapher2D.prototype.Mark=function(b,a,c){
	for(var d=0;d<b.length;d++)
	if(c[b[d]]!=a){
		if(c[b[d]]!=-1)
			return false;
		c[b[d]]=a;
		if(!this.Mark(this.graph.neibs[b[d]],a==0?1:0,c))
			return false
	}
	return true
	};

Grapher2D.prototype.Iterate=function(){
	if(this.stable)
		return this.stable;
	if(!this.physics)
		return this.stable=true,false;
	var b,a;
	for(i=0;i<this.graph.n;i++){
		a=this.vertices[i];
		for(j=a.f.x=a.f.y=a.f.z=0;j<this.graph.n;j++)
			if(i!=j){
				b=this.vertices[j];
				var c=this.repulsion/((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z));
				a.f.x+=c*(a.x-b.x);
				a.f.y+=c*(a.y-b.y);
				a.f.z+=c*(a.z-b.z)
			}
		}
		for(i=0;i<this.graph.edgesl.length;i++)
			b=this.vertices[this.graph.edgesl[i]],
			a=this.vertices[this.graph.edgesr[i]],
			a.f.x+=this.attraction*(b.x-a.x),
			a.f.y+=this.attraction*(b.y-a.y),
			a.f.z+=this.attraction*(b.z-a.z),
			b.f.x+=this.attraction*(a.x-b.x),
			b.f.y+=this.attraction*(a.y-b.y),
			b.f.z+=this.attraction*(a.z-b.z);
		for(i=b=0;i<this.graph.n;i++)
			if(a=this.vertices[i],a!=this.dragged)
				a.v.x=(a.v.x+a.f.x)*this.damping,
				a.v.y=(a.v.y+a.f.y)*this.damping,
				a.v.z=(a.v.z+a.f.z)*this.damping,
				b+=Math.abs(a.v.x)+Math.abs(a.v.y)+Math.abs(a.v.z),
				a.x+=a.v.x,a.y+=a.v.y,a.z+=a.v.z;return this.stable=b<0.5
		};

Grapher2D.prototype.SetDragged=function(b,a,c){
	b=new Point(b,a,0);
	for(i=0;i<this.graph.n;i++)
		if(a=this.vertices[i],b.distance2D(b,a)<c){
			this.dragged=a;
			this.stable=false;
			break
		}
	};

Grapher2D.prototype.MoveDragged=function(b,a){
	if(this.dragged)
		this.dragged.x=b,
		this.dragged.y=a,
		this.stable=false
	};

Grapher2D.prototype.StopDragging=function(){
	this.dragged=null
	};

Grapher2D.prototype.SwitchPhysics=function(){
	if(this.physics=!this.physics)
	this.stable=false
	};


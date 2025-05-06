import * as THREE from 'three';
// Green Rotating Cube
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const scene = new THREE.Scene();
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );


// function animate() {
//     cube.rotation.x += .01;
//     cube.rotation.y += .01;
//     renderer.render( scene, camera );
//   }
//   renderer.setAnimationLoop( animate );

// camera.position.z = 5;



// Sun stuff
function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	const fov = 40;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 50, 0 );
	camera.up.set( 0, 0, 1 );
	camera.lookAt( 0, 0, 0 );

	const scene = new THREE.Scene();

	{

		const color = 0xFFFFFF;
		const intensity = 500;
		const light = new THREE.PointLight( color, intensity );
		scene.add( light );

	}

	// an array of objects who's rotation to update
	const objects = [];

	const radius = 1;
	const widthSegments = 6;
	const heightSegments = 6;
	const sphereGeometry = new THREE.SphereGeometry(
		radius, widthSegments, heightSegments );

	const sunMaterial = new THREE.MeshPhongMaterial( { emissive: 0xFFFF00 } );
	const sunMesh = new THREE.Mesh( sphereGeometry, sunMaterial );
	sunMesh.scale.set( 5, 5, 5 );
	scene.add( sunMesh );
	objects.push( sunMesh );

	function resizeRendererToDisplaySize( renderer ) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {

			renderer.setSize( width, height, false );

		}

		return needResize;

	}

	function render( time ) {

		time *= 0.001;

		if ( resizeRendererToDisplaySize( renderer ) ) {

			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();

		}

		objects.forEach( ( obj ) => {

			obj.rotation.y = time;

		} );

		renderer.render( scene, camera );

		requestAnimationFrame( render );

	}

	requestAnimationFrame( render );

}

main();
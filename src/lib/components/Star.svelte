<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import toast, { Toaster } from 'svelte-french-toast';
  
    let scene, camera, renderer, star, bloom;
    export let fov, color;

    onMount(() => {
        init();
        animate();
    });
  
    function init() {
        const canvas = document.getElementById('star');
    
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(fov, canvas.width / canvas.height, 0.1, 1000);
    
        const textureLoader = new THREE.TextureLoader();
        const starTexture = textureLoader.load('/assets/textures/star-texture.jpg');
    
        const starMaterial = new THREE.MeshBasicMaterial({
            map: starTexture,
            color: color,
            emissive: 0x080808,
            shininess: 10,
            flatShading: true
        });
    
        const starGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        star = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(star);
    
        camera.position.z = 2;
    
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
    
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 0).normalize();
        scene.add(directionalLight);
    
        const bloomTexture = textureLoader.load('/assets/textures/glow.png');
        const bloomMaterial = new THREE.SpriteMaterial({ map: bloomTexture, color: color });
        bloom = new THREE.Sprite(bloomMaterial);
        bloom.scale.set(2, 2, 1); 
        star.add(bloom);
    
        window.addEventListener('resize', onWindowResize);

        renderer.domElement.addEventListener('webglcontextlost', function(event) {
                console.error('WebGL context lost');
                document.getElementById("three-stars-bg").remove();
                    toast.error("WebGL Context Lost, Please reload the website.", {
                        style: 'border: 1px solid #FFFFFF; padding: 16px; color: #FFFFFF; background-color: transparent;',
                        iconTheme: {
                            primary: '#FFFFFF',
                            secondary: '#000000'
                        }
                    });
        });
    }
  
    function animate() {
        requestAnimationFrame(animate);
        
        // star rotation
        star.rotation.y += 0.002;
  
        renderer.render(scene, camera);
    }
  
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  
      renderer.setSize(window.innerWidth * 0.8 - 20, window.innerHeight * 0.8 - 20);
    }
</script>

<canvas id="star" width="850px" height="850px" oncontextmenu="return false;"></canvas>

<Toaster />
  
<style>
    #star {
        animation: zoom-in-zoom-out 1.5s ease;
    }

    @keyframes zoom-in-zoom-out {
        0% {
            transform: scale(0.2);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
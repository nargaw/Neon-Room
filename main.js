import * as THREE from "https://cdn.skypack.dev/pin/three@v0.131.3-QQa34rwf1xM5cawaQLl8/mode=imports/optimized/three.js"
import { OrbitControls } from "https://cdn.skypack.dev/three@v0.131.3-QQa34rwf1xM5cawaQLl8/examples/jsm/controls/OrbitControls.js"
const canvas = document.querySelector('.webgl')

class NeonRoom{
    constructor(){
        this._Init()
    }
    
    _Init(){
        this.scene = new THREE.Scene()
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial()
        )
        this.scene.add(box)
        this.InitRoom()
        this.InitCamera()
        this.InitLights()
        this.InitRenderer()
        this.InitControls()
        this.Update()
        window.addEventListener('resize', () => {
            this.Resize()
        })
    }
    InitRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        })
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.render(this.scene, this.camera)
    }

    InitCamera(){
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 100)
        this.camera.position.set(0, 0.5, 4)
        this.scene.add(this.camera)
    }

    InitRoom(){
        const wallGeometry = new THREE.PlaneGeometry(5, 5)
        const wallMaterial = new THREE.MeshStandardMaterial({ 
            side: THREE.DoubleSide 
        })

        const backwall = new THREE.Mesh(wallGeometry, wallMaterial)
        backwall.position.z = -2.5
        this.scene.add(backwall)

        const leftwall = new THREE.Mesh(wallGeometry, wallMaterial)
        leftwall.rotation.y = -Math.PI * 0.5
        leftwall.position.x = -2.5
        this.scene.add(leftwall)

        const rightwall = new THREE.Mesh(wallGeometry, wallMaterial)
        rightwall.rotation.y = -Math.PI * 0.5
        rightwall.position.x = 2.5
        this.scene.add(rightwall)

        const roof = new THREE.Mesh(wallGeometry, wallMaterial)
        roof.position.y = 2.5
        roof.rotation.x = -Math.PI * 0.5
        this.scene.add(roof)
        const floor = new THREE.Mesh(wallGeometry, wallMaterial)
        floor.position.y = -2.5
        floor.rotation.x = -Math.PI * 0.5
        this.scene.add(floor)
    }

    InitLights(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        this.scene.add(this.ambientLight)

        this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        this.scene.add(this.directionalLight)
        this.directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 0.5)
        this.scene.add(this.directionalLightHelper)
    }

    InitControls(){
        this.controls = new OrbitControls(this.camera, canvas)
        this.controls.enableDamping = true
        this.controls.update()
    }

    Resize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    Update(){
        requestAnimationFrame(() => {     
            this.renderer.render(this.scene, this.camera)
            this.controls.update()
            this.Update()
        })  
    }
}

let _APP = null

window.addEventListener('DOMContentLoaded', () => {
    _APP = new NeonRoom()
})



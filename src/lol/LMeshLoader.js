import { DataView2 } from '../core/DataView2';
import { Lol } from './Lol';

/**
 * @author tengge / https://github.com/tengge1
 */

function LMeshLoader(manager) {
    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
}

LMeshLoader.prototype.load = function(url, onLoad, onProgress, onError) {
    var scope = this;
    var loader = new THREE.FileLoader(scope.manager);
    loader.setResponseType('arraybuffer');
    loader.load(url, function(text) {
        scope.parse(text, onLoad);
    }, onProgress, onError);
};

LMeshLoader.prototype.parse = function(data, onLoad) {
    var r = new DataView2(data);
    try {
        var magic = r.getUint32();
        if (magic != 604210091) {
            console.log("Bad magic value");
            return;
        }
    } catch (err) {
        console.log(err);
        return;
    }
    var version = r.getUint32();
    var animFile = r.getString();
    var textureFile = r.getString();

    if (animFile && animFile.length > 0) {
        var url = 'models/' + animFile + ".lanim";
        this.loadAnimFile(url);
    }

    if (textureFile && textureFile.length > 0) {
        //self.texture = new Lol.Texture(self, self.champion + "/" + textureFile + ".png")
    }

    var meshes = null;
    var numMeshes = r.getUint32();
    if (numMeshes > 0) {
        meshes = new Array(numMeshes);
        for (var i = 0; i < numMeshes; ++i) {
            var name = r.getString().toLowerCase();
            var vStart = r.getUint32();
            var vCount = r.getUint32();
            var iStart = r.getUint32();
            var iCount = r.getUint32();
            meshes[i] = {
                name: name,
                vStart: vStart,
                vCount: vCount,
                iStart: iStart,
                iCount: iCount
            }
        }
    }

    var numVerts = r.getUint32();
    var vertices = new Array(numVerts);
    var vbData = new Float32Array(numVerts * 8);
    if (numVerts > 0) {
        for (var i = 0; i < numVerts; ++i) {
            var idx = i * 8;
            vertices[i] = v = new Lol.Vertex(r);
            vbData[idx] = v.position[0];
            vbData[idx + 1] = v.position[1];
            vbData[idx + 2] = v.position[2];
            vbData[idx + 3] = v.normal[0];
            vbData[idx + 4] = v.normal[1];
            vbData[idx + 5] = v.normal[2];
            vbData[idx + 6] = v.u;
            vbData[idx + 7] = v.v
        }
    }

    var numIndices = r.getUint32();
    if (numIndices > 0) {
        var indices = new Array(numIndices);
        // for (i = 0; i < numIndices; ++i) {
        //     self.indices[i] = r.getUint16()
        // }
    }
    var numBones = r.getUint32();
    if (numBones > 0) {
        var transforms = new Array(numBones);
        // self.bones = new Array(numBones);
        // for (i = 0; i < numBones; ++i) {
        //     self.bones[i] = new Lol.Bone(self, i, r);
        //     if (self.boneLookup[self.bones[i].name] !== undefined) {
        //         self.bones[i].name = self.bones[i].name + "2"
        //     }
        //     self.boneLookup[self.bones[i].name] = i;
        //     self.transforms[i] = new mat4.create
        // }
    }
    if (self.vbData) {
        // self.vb = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
        // gl.bufferData(gl.ARRAY_BUFFER, self.vbData, gl.DYNAMIC_DRAW)
    }
    if (self.indices) {
        // self.ib = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.ib);
        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(self.indices), gl.STATIC_DRAW)
    }
    this.loaded = true;
};

LMeshLoader.prototype.loadAnimFile = function(url) {

};

export { LMeshLoader };
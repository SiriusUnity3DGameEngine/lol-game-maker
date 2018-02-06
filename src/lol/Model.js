import { DataView2 as DataView } from './DataView2';
import { Vertex } from './Vertex';
import { Texture } from './Texture';
import { Bone } from './Bone';
import { HiddenBones } from './HiddenBones';
import { Animation } from './Animation';
import { vertShader, fragShader } from './Shader';

/**
 * @author tengge / https://github.com/tengge1
 */

function Model() {
    var self = this;
    //vec3.set(renderer.up, 0, 1, 0);
    //self.renderer = renderer;
    //self.viewer = viewer;
    //self.model = model;
    //self.modelIndex = index;
    self.loaded = false;
    self.animsLoaded = false;
    //self.opts = self.viewer.options;
    self.meta = null;
    //self.parent = parent || null;
    self.texture = null;
    self.meshTextures = {};
    self.animIndex = -1;
    self.animName = null;
    self.baseAnim = null;
    self.meshes = null;
    self.vertices = null;
    self.indices = null;
    self.transforms = null;
    self.bones = null;
    self.boneLookup = {};
    self.matrix = mat4.create();
    self.ib = null;
    self.shaderReady = false;
    self.vs = null;
    self.fs = null;
    self.program = null;
    self.uniforms = null;
    self.attribs = null;
    self.ambientColor = [.35, .35, .35, 1];
    self.primaryColor = [1, 1, 1, 1];
    self.secondaryColor = [.35, .35, .35, 1];
    self.lightDir1 = vec3.create();
    self.lightDir2 = vec3.create();
    self.lightDir3 = vec3.create();
    vec3.normalize(self.lightDir1, [5, 5, -5]);
    vec3.normalize(self.lightDir2, [5, 5, 5]);
    vec3.normalize(self.lightDir3, [-5, -5, -5]);
    self.animBounds = false;
    self.boundsCenter = [0, 0, 0];
    self.boundsSize = [0, 0, 0];
    self.boundsMin = [0, 0, 0];
    self.boundsMax = [0, 0, 0];
    self.modelOffset = 0;
    self.defaultDistance = 0;
    self.newAnimation = false;
    self.tmpMat = mat4.create();
    self.tmpVec = vec4.create();
    self.ANIMATED = true;
    self.hiddenBones = null;
    var hiddenBones = HiddenBones;
    // if (hiddenBones[self.model.champion] !== undefined) {
    //     if (hiddenBones[self.model.champion][self.model.skin] !== undefined) {
    //         self.hiddenBones = hiddenBones[self.model.champion][self.model.skin]
    //     }
    // }
    //self.load()

    self.geometry = new THREE.BufferGeometry();
    self.material = new THREE.RawShaderMaterial({
        uniforms: {
            uAmbientColor: {
                value: new THREE.Vector4().fromArray(self.ambientColor)
            },
            uPrimaryColor: {
                value: new THREE.Vector4().fromArray(self.primaryColor)
            },
            uSecondaryColor: {
                value: new THREE.Vector4().fromArray(self.secondaryColor)
            },
            uLightDir1: {
                value: new THREE.Vector3().fromArray(self.lightDir1)
            },
            uLightDir2: {
                value: new THREE.Vector3().fromArray(self.lightDir2)
            },
            uLightDir3: {
                value: new THREE.Vector3().fromArray(self.lightDir3)
            },
            uHasTexture: {
                value: 0
            },
            uTexture: {
                value: null
            }
        },
        vertexShader: vertShader,
        fragmentShader: fragShader,
    });
};

Model.prototype = {
    external: {
        getNumAnimations: function() {
            return this.animations ? this.animations.length : 0
        },
        getAnimation: function(index) {
            this.animations.sort(function(a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0
            });
            if (this.animations && this.animations.length > index && index > -1) {
                return this.animations[index].name
            } else {
                return ""
            }
        },
        setAnimation: function(name) {
            for (i = 0; i < this.renderer.models.length; ++i) {
                this.renderer.models[i].setAnimation(name)
            }
        },
        isLoaded: function() {
            return this.loaded && this.animsLoaded
        }
    },
    destroy: function() {
        var self = this,
            gl = self.renderer.context,
            i, j;
        if (self.program) gl.deleteProgram(self.program);
        if (self.vs) gl.deleteShader(self.vs);
        if (self.fs) gl.deleteShader(self.fs);
        if (self.textures) {
            for (i = 0; i < self.textures.length; ++i) {
                self.textures[i].destroy()
            }
        }
        if (self.models) {
            for (i = 0; i < self.models.length; ++i) {
                self.models[i].destroy()
            }
        }
        if (self.geometry) {
            for (i = 0; i < self.geometry.length; ++i) {
                self.geometry[i].destroy()
            }
        }
    },
    getAnimation: function(name) {
        var self = this,
            i, animIndex = -1;
        if (!self.animations) return animIndex;
        name = name.toLowerCase();
        if (name == "idle" || name == "attack") {
            var anims = [],
                re = new RegExp(name + "[0-9]*");
            for (i = 0; i < self.animations.length; ++i) {
                if (self.animations[i].name.search(re) == 0) anims.push(i)
            }
            if (anims.length > 0) {
                animIndex = anims[Math.randomInt(0, anims.length)]
            }
        } else {
            for (i = 0; i < self.animations.length; ++i) {
                if (self.animations[i].name == name) {
                    animIndex = i;
                    break
                }
            }
        }
        return animIndex
    },
    setAnimation: function(name) {
        var self = this;
        self.animIndex = self.getAnimation(name);
        if (self.animIndex == -1) {
            if (name == "idle") {
                self.animIndex = 0;
                if (self.animations) {
                    self.animName = self.animations[0].name
                }
            } else {
                self.setAnimation("idle");
                return
            }
        } else {
            self.animName = name
        }
        var baseAnims = ZamModelViewer.Lol.Model.BaseAnimations;
        if (baseAnims[self.model.champion] !== undefined) {
            if (baseAnims[self.model.champion][self.model.skin] !== undefined) {
                var baseAnim = baseAnims[self.model.champion][self.model.skin],
                    baseIndex = -1;
                if (baseAnim[self.animations[self.animIndex].name]) baseIndex = self.getAnimation(baseAnim[self.animations[self.animIndex].name]);
                else if (baseAnim["all"]) baseIndex = self.getAnimation(baseAnim["all"]);
                if (baseIndex > -1) self.baseAnim = self.animations[baseIndex];
                else self.baseAnim = null
            }
        }
        self.animTime = self.renderer.time;
        self.newAnimation = true
    },
    update: function() {
        var self = this,
            i, j, gl = self.renderer.context;
        if (!self.loaded || !self.vertices || !self.animations || self.animations.length == 0) return;
        if (self.animIndex == -1) self.setAnimation("idle");
        var time = self.renderer.time - self.animTime;
        var anim = self.animations[self.animIndex];
        if (time >= anim.duration) {
            self.setAnimation(self.animName);
            anim = self.animations[self.animIndex];
            time = 0
        }
        if (self.ANIMATED) {
            var timePerFrame = 1e3 / anim.fps;
            var frame = Math.floor(time / timePerFrame);
            var r = time % timePerFrame / timePerFrame;
            var hiddenBones = {};
            if (self.hiddenBones) {
                if (self.hiddenBones[anim.name]) hiddenBones = self.hiddenBones[anim.name];
                else if (self.hiddenBones["all"]) hiddenBones = self.hiddenBones["all"]
            }
            var b;
            if (self.version >= 1) {
                for (i = 0; i < self.bones.length; ++i) {
                    b = self.bones[i];
                    if (hiddenBones[b.name]) {
                        mat4.identity(self.tmpMat);
                        mat4.scale(self.tmpMat, self.tmpMat, vec3.set(self.tmpVec, 0, 0, 0));
                        mat4.copy(self.transforms[i], self.tmpMat)
                    } else if (anim.lookup[b.name] !== undefined) {
                        anim.bones[anim.lookup[b.name]].update(i, frame, r)
                    } else if (self.baseAnim && self.baseAnim.lookup[b.name] !== undefined) {
                        self.baseAnim.bones[self.baseAnim.lookup[b.name]].update(i, frame, r)
                    } else {
                        if (b.parent != -1) {
                            mat4.mulSlimDX(self.transforms[i], b.incrMatrix, self.transforms[b.parent])
                        } else {
                            mat4.copy(self.transforms[i], b.incrMatrix)
                        }
                    }
                }
            } else {
                for (i = 0; i < anim.bones.length; ++i) {
                    b = anim.bones[i];
                    if (self.boneLookup[b.bone] !== undefined) {
                        b.update(self.boneLookup[b.bone], frame, r)
                    } else {
                        var parentBone = anim.bones[i - 1];
                        if (!parentBone) continue;
                        if (parentBone.index + 1 < self.transforms.length) {
                            mat4.copy(self.transforms[parentBone.index + 1], self.transforms[parentBone.index])
                        }
                        b.index = parentBone.index + 1
                    }
                }
            }
            var numBones = Math.min(self.transforms.length, self.bones.length);
            for (i = 0; i < numBones; ++i) {
                mat4.mulSlimDX(self.transforms[i], self.bones[i].baseMatrix, self.transforms[i])
            }
            mat4.identity(self.tmpMat);
            var numVerts = self.vertices.length,
                vbData = self.vbData,
                vec = self.tmpVec,
                v, w, m, idx;
            for (i = 0; i < numVerts; ++i) {
                v = self.vertices[i];
                idx = i * 8;
                vbData[idx] = vbData[idx + 1] = vbData[idx + 2] = vbData[idx + 3] = vbData[idx + 4] = vbData[idx + 5] = 0;
                for (j = 0; j < 4; ++j) {
                    if (v.weights[j] > 0) {
                        w = v.weights[j];
                        m = anim.fps == 1 ? self.tmpMat : self.transforms[v.bones[j]];
                        vec3.transformMat4(vec, v.position, m);
                        vbData[idx] += vec[0] * w;
                        vbData[idx + 1] += vec[1] * w;
                        vbData[idx + 2] += vec[2] * w;
                        vec4.transformMat4(vec, v.normal, m);
                        vbData[idx + 3] += vec[0] * w;
                        vbData[idx + 4] += vec[1] * w;
                        vbData[idx + 5] += vec[2] * w
                    }
                }
            }
            if (!self.animBounds) {
                self.updateBounds(true);
                self.animBounds = true
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, self.vbData)
        }
        if (self.newAnimation) {
            self.updateBounds(true);
            self.newAnimation = false
        }
    },
    updatePosition: function() {
        var self = this,
            index = self.modelIndex,
            offset = self.renderer.models[0].boundsSize[0] * 1.5;
        if (index > 2) {
            offset += Math.abs(self.renderer.models[index - 2].modelOffset)
        }
        if (self.modelIndex % 2 > 0) offset = -offset;
        self.modelOffset = offset;
        mat4.identity(self.matrix);
        mat4.translate(self.matrix, self.matrix, vec3.negate(self.tmpVec, self.boundsCenter));
        mat4.scale(self.matrix, self.matrix, vec3.set(self.tmpVec, -1, 1, 1));
        vec3.normalize(self.tmpVec, vec3.set(self.tmpVec, 4, 0, -1));
        vec3.scale(self.tmpVec, self.tmpVec, offset);
        if (offset < 0) self.tmpVec[2] = -self.tmpVec[2];
        self.matrix[12] += self.tmpVec[0];
        self.matrix[13] += self.tmpVec[1];
        self.matrix[14] += self.tmpVec[2]
    },
    updateBounds: function(useVb) {
        var self = this,
            i, j, m, idx, verts = self.vertices,
            vbData = self.vbData;
        var min = vec3.set(self.boundsMin, 9999, 9999, 9999),
            max = vec3.set(self.boundsMax, -9999, -9999, -9999),
            pos;
        if (!verts) return;
        if (self.meshes && self.indices) {
            var firstIndex, numIndices, visible;
            for (i = 0; i < self.meshes.length; ++i) {
                m = self.meshes[i];
                visible = !(self.meta && self.meta.meshVis[m.name] === false);
                if (!visible) continue;
                firstIndex = m.iStart;
                numIndices = m.iCount;
                for (j = 0; j < numIndices; ++j) {
                    if (useVb) {
                        idx = self.indices[firstIndex + j] * 8;
                        pos = vec3.set(self.tmpVec, vbData[idx], vbData[idx + 1], vbData[idx + 2])
                    } else {
                        pos = vec3.copy(self.tmpVec, verts[self.indices[firstIndex + j]].position)
                    }
                    if (pos[1] < -250) pos[1] = min[1];
                    min = vec3.min(min, min, pos);
                    max = vec3.max(max, max, pos)
                }
            }
        } else {
            for (i = 0; i < verts.length; ++i) {
                if (useVb) {
                    idx = i * 8;
                    pos = vec3.set(self.tmpVec, vbData[idx], vbData[idx + 1], vbData[idx + 2])
                } else {
                    pos = vec3.copy(self.tmpVec, verts[i].position)
                }
                if (pos[1] < -250) pos[1] = min[1];
                min = vec3.min(min, min, pos);
                max = vec3.max(max, max, pos)
            }
        }
        vec3.subtract(self.boundsSize, max, min);
        vec3.scaleAndAdd(self.boundsCenter, min, self.boundsSize, .5);
        vec3.copy(self.tmpVec, self.boundsCenter);
        self.tmpVec[1] = -self.tmpVec[1];
        mat4.identity(self.matrix);
        mat4.translate(self.matrix, self.matrix, self.tmpVec);
        mat4.scale(self.matrix, self.matrix, vec3.set(self.tmpVec, -1, 1, 1));
        // var models = self.renderer.models;
        // if (models.length > 1) {
        //     for (i = 1; i < models.length; ++i) {
        //         models[i].updatePosition()
        //     }
        //     if (self.modelIndex != 0) models[0].updateDistance()
        // }
        // if (self.modelIndex == 0) {
        //     self.updateDistance()
        // }
    },
    updateDistance: function() {
        var self = this,
            models = self.renderer.models;
        var wSize = self.boundsSize[0],
            hSize = self.boundsSize[1],
            dSize = self.boundsSize[2];
        if (models.length > 1) {
            var width = Math.abs(models[models.length - 1].modelOffset) + models[models.length - 1].boundsSize[0];
            if (models.length > 2) {
                width += Math.abs(models[models.length - 2].modelOffset) + models[models.length - 2].boundsSize[0]
            } else {
                width *= 2
            }
            wSize = Math.max(wSize, width)
        }
        var dist;
        if (self.opts.dist) {
            dist = self.opts.dist
        } else {
            var ratio = self.renderer.width / self.renderer.height;
            var hTan = 2 * Math.tan(self.renderer.fov / 2 * .0174532925);
            var wTan = hTan * ratio;
            var hDist = hSize * 1.2 / hTan;
            var wDist = wSize * 1.2 / wTan;
            dist = Math.max(Math.max(hDist, wDist), dSize * 2)
        }
        if (self.defaultDistance == 0 || self.defaultDistance == self.renderer.distance) {
            self.defaultDistance = self.renderer.distance = dist
        }
    }
};

Model.prototype.load = function(url) {
    var self = this;
    var loader = new THREE.FileLoader();
    loader.setResponseType('arraybuffer');
    loader.load(url, function(buffer) {
        self.loadMesh(buffer);
    });
};

Model.prototype.loadMesh = function(buffer) {
    if (!buffer) {
        console.error("Bad buffer for DataView");
        return
    }
    var self = this,
        r = new DataView(buffer),
        i,
        v,
        idx;
    try {
        var magic = r.getUint32();
        if (magic != 604210091) {
            console.log("Bad magic value");
            return
        }
    } catch (err) {
        alert("Model currently isn't loading! We're sorry and hope to have this fixed soon.");
        console.log(err);
        return
    }
    self.version = r.getUint32();
    var animFile = r.getString();
    var textureFile = r.getString();
    if (animFile && animFile.length > 0) {
        var url = "models/" + animFile + ".lanim";
        var loader = new THREE.FileLoader();
        loader.setResponseType('arraybuffer');
        loader.load(url, function(buffer) {
            self.loadAnim(buffer)
        });
    }
    if (textureFile && textureFile.length > 0) {
        self.texture = new Texture(self, "textures/1/" + textureFile + ".png")
    }
    var numMeshes = r.getUint32();
    if (numMeshes > 0) {
        self.meshes = new Array(numMeshes);
        for (i = 0; i < numMeshes; ++i) {
            var name = r.getString().toLowerCase();
            var vStart = r.getUint32();
            var vCount = r.getUint32();
            var iStart = r.getUint32();
            var iCount = r.getUint32();
            self.meshes[i] = {
                name: name,
                vStart: vStart,
                vCount: vCount,
                iStart: iStart,
                iCount: iCount
            }
        }
    }
    var numVerts = r.getUint32();
    if (numVerts > 0) {
        self.vertices = new Array(numVerts);
        self.vbData = new Float32Array(numVerts * 8);
        var position = [];
        var normal = [];
        for (i = 0; i < numVerts; ++i) {
            idx = i * 8;
            self.vertices[i] = v = new Vertex(r);
            self.vbData[idx] = v.position[0];
            self.vbData[idx + 1] = v.position[1];
            self.vbData[idx + 2] = v.position[2];
            self.vbData[idx + 3] = v.normal[0];
            self.vbData[idx + 4] = v.normal[1];
            self.vbData[idx + 5] = v.normal[2];
            self.vbData[idx + 6] = v.u;
            self.vbData[idx + 7] = v.v

            position.push(v.position[0], v.position[1], v.position[2]);
            normal.push(v.normal[0], v.normal[1], v.normal[2]);
        }
        self.geometry.addAttribute('position',
            new THREE.BufferAttribute(new Float32Array(position), 3));
        self.geometry.addAttribute('normal',
            new THREE.BufferAttribute(new Float32Array(normal), 3));
    }
    var numIndices = r.getUint32();
    if (numIndices > 0) {
        self.indices = new Array(numIndices);
        for (i = 0; i < numIndices; ++i) {
            self.indices[i] = r.getUint16()
        }
        self.geometry.setIndex(new THREE.BufferAttribute(
            new Int16Array(self.indices, 2)
        ));
    }
    var numBones = r.getUint32();
    if (numBones > 0) {
        self.transforms = new Array(numBones);
        self.bones = new Array(numBones);
        for (i = 0; i < numBones; ++i) {
            self.bones[i] = new Bone(self, i, r);
            if (self.boneLookup[self.bones[i].name] !== undefined) {
                self.bones[i].name = self.bones[i].name + "2"
            }
            self.boneLookup[self.bones[i].name] = i;
            self.transforms[i] = new mat4.create
        }
    }
    if (self.vbData) {
        //self.vb = gl.createBuffer();
        //gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
        //gl.bufferData(gl.ARRAY_BUFFER, self.vbData, gl.DYNAMIC_DRAW)
    }
    if (self.indices) {
        //self.ib = gl.createBuffer();
        //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.ib);
        //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(self.indices), gl.STATIC_DRAW)
    }
    self.loaded = true;
    self.updateBounds()
};

Model.prototype.loadAnim = function(buffer) {
    if (!buffer) {
        console.error("Bad buffer for DataView");
        return
    }
    var self = this,
        r = new DataView(buffer),
        i;
    var magic = r.getUint32();
    if (magic != 604210092) {
        console.log("Bad magic value");
        return
    }
    var version = r.getUint32();
    if (version >= 2) {
        var compressedData = new Uint8Array(buffer, r.position);
        var data = null;
        try {
            data = pako.inflate(compressedData)
        } catch (err) {
            console.log("Decompression error: " + err);
            return
        }
        r = new DataView(data.buffer)
    }
    var numAnims = r.getUint32();
    if (numAnims > 0) {
        self.animations = new Array(numAnims);
        for (i = 0; i < numAnims; ++i) {
            self.animations[i] = new Animation(self, r, version)
        }
    }
    self.animsLoaded = true
};

Model.prototype.draw = function() {
    var self = this,
        gl = self.renderer.context,
        i;
    if (!self.loaded) return;
    if (!self.shaderReady) self.initShader();
    if (!self.program) return;
    self.update();
    gl.useProgram(self.program);
    gl.uniformMatrix4fv(self.uniforms.vModelMatrix, false, self.matrix);
    gl.uniformMatrix4fv(self.uniforms.vViewMatrix, false, self.renderer.viewMatrix);
    gl.uniformMatrix4fv(self.uniforms.vProjMatrix, false, self.renderer.projMatrix);
    gl.uniform4fv(self.uniforms.fAmbientColor, self.ambientColor);
    gl.uniform4fv(self.uniforms.fPrimaryColor, self.primaryColor);
    gl.uniform4fv(self.uniforms.fSecondaryColor, self.secondaryColor);
    gl.uniform3fv(self.uniforms.fLightDir1, self.lightDir1);
    gl.uniform3fv(self.uniforms.fLightDir2, self.lightDir2);
    gl.uniform3fv(self.uniforms.fLightDir3, self.lightDir3);
    gl.uniform1i(self.uniforms.fTexture, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, self.vb);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, self.ib);
    var cull = gl.getParameter(gl.CULL_FACE);
    if (!cull) gl.enable(gl.CULL_FACE);
    var face = gl.getParameter(gl.FRONT_FACE);
    if (face != gl.CW) gl.frontFace(gl.CW);
    for (i in self.attribs) {
        var a = self.attribs[i];
        gl.enableVertexAttribArray(a.loc);
        gl.vertexAttribPointer(a.loc, a.size, a.type, false, a.stride, a.offset)
    }
    if (self.meshes) {
        var m, visible;
        for (i = 0; i < self.meshes.length; ++i) {
            m = self.meshes[i];
            visible = !(self.meta && self.meta.meshVis[m.name] === false);
            if (self.meta && self.meta.animMeshVis[self.animName] !== undefined && self.meta.animMeshVis[self.animName][m.name] !== undefined) visible = self.meta.animMeshVis[self.animName][m.name];
            if (!visible) continue;
            if (self.meshTextures[m.name] !== undefined) {
                if (self.meshTextures[m.name].texture) {
                    gl.uniform1i(self.uniforms.fHasTexture, true);
                    gl.bindTexture(gl.TEXTURE_2D, self.meshTextures[m.name].texture)
                } else {
                    gl.uniform1i(self.uniforms.fHasTexture, false)
                }
            } else if (self.texture && self.texture.texture) {
                gl.uniform1i(self.uniforms.fHasTexture, true);
                gl.bindTexture(gl.TEXTURE_2D, self.texture.texture)
            } else {
                gl.uniform1i(self.uniforms.fHasTexture, false)
            }
            gl.drawElements(gl.TRIANGLES, m.iCount, gl.UNSIGNED_SHORT, m.iStart * 2)
        }
    } else {
        if (self.texture && self.texture.texture) {
            gl.uniform1i(self.uniforms.fHasTexture, true);
            gl.bindTexture(gl.TEXTURE_2D, self.texture.texture)
        } else {
            gl.uniform1i(self.uniforms.fHasTexture, false)
        }
        gl.drawElements(gl.TRIANGLES, self.indices.length, gl.UNSIGNED_SHORT, 0)
    }
    for (i in self.attribs) {
        gl.disableVertexAttribArray(self.attribs[i].loc)
    }
    if (!cull) gl.disable(gl.CULL_FACE);
    if (face == gl.CCW) gl.frontFace(gl.CCW)
};

Model.prototype.initShader = function() {
    var self = this,
        gl = self.renderer.context;
    self.shaderReady = true;
    var vs = self.renderer.compileShader(gl.VERTEX_SHADER, self.vertShader);
    var fs = self.renderer.compileShader(gl.FRAGMENT_SHADER, self.fragShader);
    var program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Error linking shaders");
        return
    }
    self.vs = vs;
    self.fs = fs;
    self.program = program;
    self.uniforms = {
        vModelMatrix: gl.getUniformLocation(program, "uModelMatrix"),
        vViewMatrix: gl.getUniformLocation(program, "uViewMatrix"),
        vProjMatrix: gl.getUniformLocation(program, "uProjMatrix"),
        fHasTexture: gl.getUniformLocation(program, "uHasTexture"),
        fAmbientColor: gl.getUniformLocation(program, "uAmbientColor"),
        fPrimaryColor: gl.getUniformLocation(program, "uPrimaryColor"),
        fSecondaryColor: gl.getUniformLocation(program, "uSecondaryColor"),
        fLightDir1: gl.getUniformLocation(program, "uLightDir1"),
        fLightDir2: gl.getUniformLocation(program, "uLightDir2"),
        fLightDir3: gl.getUniformLocation(program, "uLightDir3"),
        fTexture: gl.getUniformLocation(program, "uTexture")
    };
    self.attribs = {
        position: {
            loc: gl.getAttribLocation(program, "aPosition"),
            type: gl.FLOAT,
            size: 3,
            offset: 0,
            stride: 32
        },
        normal: {
            loc: gl.getAttribLocation(program, "aNormal"),
            type: gl.FLOAT,
            size: 3,
            offset: 12,
            stride: 32
        },
        texcoord: {
            loc: gl.getAttribLocation(program, "aTexCoord"),
            type: gl.FLOAT,
            size: 2,
            offset: 24,
            stride: 32
        }
    }
};

export { Model };
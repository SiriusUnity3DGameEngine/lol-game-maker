/**
 * @author tengge / https://github.com/tengge1
 */

function AnimationBone(model, anim, r, version) {
    var self = this;
    self.model = model;
    self.anim = anim;
    var numFrames = r.getUint32();
    self.bone = r.getString().toLowerCase();
    self.flags = r.getUint32();
    self.frames = new Array(numFrames);
    var scale = [1, 1, 1];
    for (var i = 0; i < numFrames; ++i) {
        var pos = [r.getFloat(), r.getFloat(), r.getFloat()];
        var rot = [r.getFloat(), r.getFloat(), r.getFloat(), r.getFloat()];
        if (version >= 3) scale = [r.getFloat(), r.getFloat(), r.getFloat()];
        self.frames[i] = {
            pos: pos,
            rot: rot,
            scale: scale
        }
    }
    self.matrix = mat4.create();
    self.tmpMat = mat4.create();
    self.tmpMat2 = mat4.create();
    self.tmpPos = vec3.create();
    self.tmpRot = quat.create();
    self.tmpScale = vec3.create()
};

AnimationBone.prototype.update = function(boneId, frame, r) {
    var self = this;
    self.index = boneId;
    var parent = self.model.bones[boneId].parent;
    var f0 = frame % self.frames.length,
        f1 = (frame + 1) % self.frames.length;
    vec3.lerp(self.tmpPos, self.frames[f0].pos, self.frames[f1].pos, r);
    vec3.lerp(self.tmpScale, self.frames[f0].scale, self.frames[f1].scale, r);
    quat.slerp(self.tmpRot, self.frames[f0].rot, self.frames[f1].rot, r);
    mat4.translation(self.tmpMat2, self.tmpPos);
    mat4.rotationQuat(self.tmpMat, self.tmpRot);
    mat4.mulSlimDX(self.matrix, self.tmpMat, self.tmpMat2);
    if (parent != -1) {
        mat4.mulSlimDX(self.matrix, self.matrix, self.model.transforms[parent])
    }
    mat4.copy(self.model.transforms[boneId], self.matrix)
};

export { AnimationBone };
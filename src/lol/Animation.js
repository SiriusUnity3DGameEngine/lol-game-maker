/**
 * @author tengge / https://github.com/tengge1
 */

function Animation(model, r, version) {
    var self = this,
        i, Lol = ZamModelViewer.Lol;
    self.model = model;
    self.meshOverride = {};
    self.name = r.getString().toLowerCase();
    self.fps = r.getInt32();
    var numBones = r.getUint32();
    self.bones = new Array(numBones);
    self.lookup = {};
    for (i = 0; i < numBones; ++i) {
        self.bones[i] = new Lol.AnimationBone(model, self, r, version);
        self.lookup[self.bones[i].bone] = i
    }
    if (numBones == 0 || self.fps <= 1) {
        self.duration = 1e3
    } else {
        self.duration = Math.floor(1e3 * (self.bones[0].frames.length / self.fps))
    }
};

export { Animation };
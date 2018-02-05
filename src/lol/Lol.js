import { Model } from './Model';
import { vertShader, fragShader } from './Shader';
import { Texture } from './Texture';
import { Vertex } from './Vertex';
import { Bone } from './Bone';
import { Animation } from './Animation';
import { AnimationBone } from './AnimationBone';
import { BaseAnimations } from './BaseAnimations';
import { HiddenBones } from './HiddenBones';

var Lol = {
    Model: Model,
    vertShader: vertShader,
    fragShader: fragShader,
    Texture: Texture,
    Vertex: Vertex,
    Bone: Bone,
    Animation: Animation,
    AnimationBone: AnimationBone,
    BaseAnimations: BaseAnimations,
    HiddenBones: HiddenBones
};

export { Lol };
﻿#ifndef VOXELPLAY_VERTEX_MODIFIER
#define VOXELPLAY_VERTEX_MODIFIER

#define VOXELPLAY_CURVATURE 0
#define VOXELPLAY_CURVATURE_AMOUNT 0.001

#if VOXELPLAY_CURVATURE
inline void ApplyCurve(inout float4 v, float3 wpos) {
    float3 vv = wpos - _WorldSpaceCameraPos;
    vv = float3(0, dot(vv.xz, vv.xz) * -VOXELPLAY_CURVATURE_AMOUNT, 0);
    v.xyz += mul((float3x3)unity_WorldToObject, vv);
}

inline void ApplyCurve(inout float3 v, float3 wpos) {
    float3 vv = wpos - _WorldSpaceCameraPos;
    vv = float3(0, dot(vv.xz, vv.xz) * -VOXELPLAY_CURVATURE_AMOUNT, 0);
    v += mul((float3x3)unity_WorldToObject, vv);
}

inline void ApplyCurve(inout float4 v) {
	float3 vv = mul(unity_ObjectToWorld, v).xyz;
    vv -= _WorldSpaceCameraPos;
    vv = float3(0, dot(vv.xz, vv.xz) * -VOXELPLAY_CURVATURE_AMOUNT, 0);
    v.xyz += mul((float3x3)unity_WorldToObject, vv);
}

inline void ApplyCurve(inout float3 v) {
	float3 vv = mul(unity_ObjectToWorld, float4(v, 1.0)).xyz;
    vv -= _WorldSpaceCameraPos;
    vv = float3(0, dot(vv.xz, vv.xz) * -VOXELPLAY_CURVATURE_AMOUNT, 0);
    v += mul((float3x3)unity_WorldToObject, vv);
}


	#define VOXELPLAY_MODIFY_VERTEX(v, worldPos) ApplyCurve(v, worldPos);
	#define VOXELPLAY_MODIFY_VERTEX_NO_WPOS(v) ApplyCurve(v);
#else
	#define VOXELPLAY_MODIFY_VERTEX(v, worldPos)
	#define VOXELPLAY_MODIFY_VERTEX_NO_WPOS(v)
#endif

#endif // VOXELPLAY_VERTEX_MODIFIER


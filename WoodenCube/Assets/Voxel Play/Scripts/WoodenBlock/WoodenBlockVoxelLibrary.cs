using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using VoxelPlay;

public class WoodenBlockVoxelLibrary
{
    VoxelPlayEnvironment env;

    static WoodenBlockVoxelLibrary _instance;

    public static WoodenBlockVoxelLibrary instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new WoodenBlockVoxelLibrary();
            }
            return _instance;
        }
    }
    WoodenBlockVoxelLibrary() {
        env = VoxelPlayEnvironment.instance;
    }
    public bool isGridBlock(VoxelHitInfo hitInfo)
    {
        return hitInfo.voxelCenter.y == 0.5f;
    }

    public bool isGridBlock(Vector3 positon)
    {
        return positon.y == 0.5f;
    }

    public bool isGridBlock(VoxelChunk chunk, int voxelIndex)
    {
        return IsGridChuck(chunk) && IsRootVoxel(voxelIndex);
    }
    public bool IsGridChuck(VoxelChunk chunk)
    {
        return chunk.position.y == 8;
    }

    public bool IsRootVoxel(int voxelIndex) // 0 ~ 255 index is bottom block in chunk
    {
        return voxelIndex < 256 && voxelIndex > -1;
    }

    public int GetYRootVoxelIndex(int voxelIndex)
    {
        return voxelIndex % 256;
    }

    public int GetHeightStartVoxelIndex(int voxelIndex)
    {
        return ((int)(voxelIndex / 256)) * 256;
    }

    public bool IsSameYAxisChunck(VoxelChunk chunk1, VoxelChunk chunk2)
    {
        if (chunk1.position.x == chunk2.position.x
            && chunk1.position.z == chunk2.position.z)
            return true;
        return false;
    }

    public bool IsSameHeightChunk(VoxelChunk chunk1, VoxelChunk chunk2)
    {
        if (chunk1.position.y == chunk2.position.y)
            return true;
        return false;
    }

    public int GetCountBlockAboveGrid()
    {
        List<VoxelChunk> chunks = new List<VoxelChunk>();
        env.GetChunks(chunks);
        int resultCount = 0;
        for (int i = 0; i < chunks.Count; ++i)
        {
            VoxelChunk chunk = chunks[i];
            if (chunk.position.y == 8)
            {
                for (int voxelIndex = 0; voxelIndex < chunk.voxels.Length; ++voxelIndex)
                {
                    Voxel voxel = chunk.voxels[voxelIndex];
                    if (1 == voxel.hasContent)
                    {
                        if (false == IsRootVoxel(voxelIndex))
                        {
                            ++resultCount;
                        }
                    }
                }
            }
            else
            {
                for (int voxelIndex = 0; voxelIndex < chunk.voxels.Length; ++voxelIndex)
                {
                    Voxel voxel = chunk.voxels[voxelIndex];
                    if (1 == voxel.hasContent)
                    {
                        ++resultCount;
                    }
                }
            }
        }
        return resultCount;
    }

    // 위에서 봤을 때 수직으로 한 줄에 몇개의 블록인지
    public int GetCountBlockYAxisLine(VoxelChunk chunk, int voxelIndex) {
        if (chunk == null) return -1;
        if (voxelIndex < 0 || voxelIndex >= 4096) return -1;
        List<VoxelChunk> chunks = new List<VoxelChunk>();
        env.GetChunks(chunks);
        int gridVoxelIndex = GetYRootVoxelIndex(voxelIndex);
        int resultCount = 0;
        int j = 0;
        for (int i = 0; i < chunks.Count; ++i)
        {
            VoxelChunk chunk_ = chunks[i];
            if (IsSameYAxisChunck(chunk, chunk_))
            {
                if (IsGridChuck(chunk_)) j = 1;
                else j = 0;
                for (; j < 16; ++j)
                {
                    Voxel voxel = chunk_.voxels[gridVoxelIndex + (j * 256)];
                    if (1 == voxel.hasContent)
                    {
                        ++resultCount;
                    }
                }
            }
        }

        return resultCount;
    }

    // 옆에서 봤을 때 같은 높이에 몇 개의 블록인지
    public int GetCountBlockSameHeight(VoxelChunk chunk, int voxelIndex) {
        if (chunk == null) return -1;
        if (voxelIndex < 0 || voxelIndex >= 4096 ) return -1;
        List<VoxelChunk> chunks = new List<VoxelChunk>();
        env.GetChunks(chunks);
        int heightStartVoxelIndex = GetHeightStartVoxelIndex(voxelIndex);
        int resultCount = 0;        
        for (int i = 0; i < chunks.Count; ++i) {
            VoxelChunk chunk_ = chunks[i];
            if (IsSameHeightChunk(chunk, chunk_)) {
                if (IsGridChuck(chunk_) && heightStartVoxelIndex == 0) continue; // grid case     
                for (int j=0; j < 256; ++j) {
                    Voxel voxel = chunk_.voxels[heightStartVoxelIndex + j];
                    if (1 == voxel.hasContent) {
                        ++resultCount;
                    }
                }
            }
        }

        return resultCount;
    }
}

using UnityEngine;
using UnityEditor;
using UnityEditor.Callbacks;
using UnityEditor.XCodeEditor;

public class SponsorPayPostProcess
{

	[PostProcessBuild(500)]
	public static void OnPostProcessBuild( BuildTarget target, string path )
	{

		if (target == BuildTarget.iPhone)
		{
			UnityEditor.XCodeEditor.XCProject project = new UnityEditor.XCodeEditor.XCProject(path);
			
			// Find and run through all projmods files to patch the project
			var files = System.IO.Directory.GetFiles(Application.dataPath, "*.projmods", System.IO.SearchOption.AllDirectories);
			foreach (var file in files)
			{
				project.ApplyMod(Application.dataPath, file);
			}
			project.Save();
		}
	}
}
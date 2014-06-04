package com.winjune.wips.manager.common.util;

import java.util.Random;

public class RandomUtil {
	private static Random rn = new Random();

	public static String randomstring(int min, int max) {
		int n = rand(min, max);
		byte b[] = new byte[n];
		for (int i = 0; i < n; i++) {
			b[i] = (byte) rand('a', 'z');
		}
		return new String(b);
	}

	public static int rand(int min, int max) {
		int n = max - min + 1;
		int i = rn.nextInt() % n;
		if (i < 0) {
			i = -i;
		}
		return min + i;
	}
}

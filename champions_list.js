export const CHAMPIONS = {
    // Busy Beaver

    "BB(2,2)": ["=6", "1RB1LB_1LA---"],
    "BB(3,2)": ["=21", "1RB---_1LB0RC_1LC1LA"],
    "BB(4,2)": ["=107", "1RB1LB_1LA0LC_---1LD_1RD0RA"],
    "BB(5,2)": ["=47,176,870", "1RB1LC_1RC1RB_1RD0LE_1LA1LD_---0LA"],
    "BB(6,2)": ["≥ttt8", "1RB1RA_1RC---_1LD0RF_1RA0LE_0LD1RC_1RA0RE"],
    "BB(7,2)": ["≥f{11}(f{10}(4))", "1RB0RA_1LC1LF_1RD0LB_1RA1LE_---0LC_1RG1LD_0RG0RF"],
    "BB(2,3)": ["=38", "1RB2LB---_2LA2RB1LB"],
    "BB(3,3)": ["≥1.191e17", "0RB2LA1RA_1LA2RB1RC_---1LB1LC"],
    "BB(4,3)": ["≥pppe28", "1RB1RD1LC_2LB1RB1LC_---1LA1LD_0RB2RA2RD"],
    "BB(2,4)": ["=3,932,964", "1RB2LA1RA1RA_1LB1LA3RB---"],
    "BB(3,4)": ["≥f{15}(4)", "1RB3LB---2RA_2LC3RB1LC2RA_3RB1LB3LC2RC"],
    "BB(2,5)": ["≥eee3,314,360", "1RB3LA4RB0RB2LA_1LB2LA3LA1RA---"],
    "BB(3,5)": [">f{ω}(f{15}(4))", "1RB3LB4LC2RA4LB_2LC3RB1LC2RA---_3RB1LB3LC2RC4LC"],
    "BB(2,6)": ["≥ttee115", "1RB3RB5RA1LB5LA2LB_2LA2RA4RB---3LB2LA"],

    // Instructions-Limited Busy Beaver

    "BBi(2)": ["=4", "0RB_1LA"],
    "BBi(3)": ["=6", "1RB1LB_1LA---"],
    "BBi(4)": ["=17", "1RB---_0RC---_1LC0LA"],
    "BBi(5)": ["=38", "1RB2LB---_2LA2RB1LB"],
    "BBi(6)": ["=124", "1RB3LA1RA0LA_2LA------3RA"],
    "BBi(7)": ["=3,932,964", "1RB2LA1RA1RA_1LB1LA3RB---"],
    "BBi(8)": ["≥6.889e1565", "1RB1LA------_1RC3LB1RB---_2LA2LC---0LC"],
    "BBi(9)": ["≥eee3,314,360", "1RB3LA4RB0RB2LA_1LB2LA3LA1RA---"],
    "BBi(11)": ["≥f{15}(4)", "1RB3LB---2RA_2LC3RB1LC2RA_3RB1LB3LC2RC"],
    "BBi(14)": [">f{ω}(f{15}(4))", "1RB3LB4LC2RA4LB_2LC3RB1LC2RA---_3RB1LB3LC2RC4LC"],

    // Uniform-Action Busy Beaver

    "BBu(2)": ["=6", "1RB---_1LB1LA"],
    "BBu(3)": ["≥17", "1RB---_0RC0RC_1LC1LA"],
    "BBu(4)": ["≥29", "1RB1RD_0LC0LA_1LC1LA_0RC---"],
    "BBu(5)": ["≥441", "1RB1RA_0RC0RE_1LC1LD_1LA1LD_---1RB"],

    // Blanking Busy Beaver

    "BLB(2,2)": ["≥8", "1RB0RA_1LB1LA"],
    "BLB(3,2)": ["≥34", "1RB1LB_1LA1LC_1RC0LC"],
    "BLB(4,2)": ["≥32,779,477", "1RB1LD_1RC1RB_1LC1LA_0RC0RD"],
    "BLB(2,3)": ["≥77", "1RB2LA0RB_1LA0LB1RA"],
    "BLB(3,3)": [">329", "1RB2LC2LA_1LC---2RA_2RC2LB0LC"],
    "BLB(2,4)": ["≥1.367e12", "1RB2RA1RA2RB_2LB3LA0RB0RA"],

    // Instructions-Limited Blanking Busy Beaver

    "BLBi(3)": ["=4", "1RB0RA_1LA---"],
    "BLBi(4)": ["=12", "1RB---_1RC---_1LC0RC"],
    "BLBi(5)": ["=30", "1RB------_1RC------_2LC2RC0RC"],
    "BLBi(6)": ["=77", "1RB2LA0RB_1LA0LB1RA "],
    "BLBi(7)": ["≥173", "1RB------_2RC2RB1LB_2LC2RB0RC"],
    "BLBi(8)": ["≥1.367e12", "1RB2RA1RA2RB_2LB3LA0RB0RA"],

    // Uniform-Action Blanking Busy Beaver

    "BLBu(2)": ["≥3", "1RB---_0LB0LA"],
    "BLBu(3)": ["≥9", "1RB---_0RC0RB_1LB1LC"],
    "BLBu(4)": ["≥133", "1RB1RA_0RC0RA_1LC1LD_0RB0RD"],
    "BLBu(5)": ["≥1,105", "1RB1RD_1LC1LB_1RA1RB_0LE0LD_1RE1RA"],

    // Semi-Infinite Tape Busy Beaver

    "BBt(2,2)": ["≥3", "1RB---_1LB0RB"],
    "BBt(3,2)": ["≥12", "0RB0LB_0RC1RC_1LA0LC"],
    "BBt(4,2)": ["≥63", "0RB0LD_0RC1LC_0RD1LA_1LB1RD "],
    "BBt(6,2)": [">506", "1RB---_1RC---_0RD0RC_1RE1RD_1LF---_1LC1LF"],
    "BBt(2,3)": ["≥17", "1RB0RA0RB_2LA2RB1LB"],
    "BBt(3,3)": ["≥202", "1RB2RC1LC_0RC0RB1LA_2LA2RC1LB"],
    "BBt(4,3)": [">425", "1RB------_1RC------_0RD0RC1LD_1LC2RD0LC"],
    "BBt(2,4)": ["≥55", "2RB1RB1RA2LB_1LA3RB1LB0RB"],

    // Instructions-Limited Semi-Infinite Tape Busy Beaver

    "BBti(3)": ["≥3", "1RB---_1LB0RB"],
    "BBti(4)": ["≥8", "1RB---_1RC---_1LC0RC"],
    "BBti(5)": ["≥18", "1RB------_1RC------_2LC2RC0RC"],
    "BBti(6)": ["≥36", "1RB------_1RC------_1RD------_2LD2RD0RD "],
    "BBti(7)": ["≥93", "1RB------_0RC0RB1LC_1LB2RC0LB"],
    "BBti(8)": ["≥425", "1RB------_1RC------_0RD0RC1LD_1LC2RD0LC"],
    "BBti(9)": [">506", "1RB---_1RC---_0RD0RC_1RE1RD_1LF---_1LC1LF"],

    // Uniform-Action Semi-Infinite Tape Busy Beaver

    "BBtu(2)": ["≥2", "0RB---_1LA1LB"],
    "BBtu(3)": ["≥11", "1RB---_0RC0RB_1LB1LC"],
    "BBtu(4)": ["≥26", "1RB---_1RC---_0RD0RC_1LC1LD"],
    "BBtu(5)": ["≥49", "1RB---_0RC0RD_1LB1LA_0RE0RB_1LD1LE"],
    "BBtu(6)": ["≥506", "1RB---_1RC---_0RD0RC_1RE1RD_1LF---_1LC1LF"],

    // Terminating Turmite

    "TT(2,2)": ["≥13", "1TB---_1PA0PB"],
    "TT(3,2)": ["≥82", "1PB0PA_1TA0PC_1PA---"],
    "TT(4,2)": ["≥48,186", "1TB1PA_1PC0PA_1TA0PD_---1TA"],
    "TT(2,3)": ["≥223", "1TB0PA2PA_2PA---1PA"],
    "TT(3,3)": ["≥45,153", "1PB1PA1TA_2TB2PB2PC_---2PA1TC"],
    "TT(2,4)": ["≥3.467e15", "1TA2PB3TB---_3TA1PB1TA1PA"],

    // Instructions-Limited Terminating Turmite

    "TTi(2)": ["≥6", "0PB_1TA"],
    "TTi(3)": ["≥13", "1TB---_1PA0PB"],
    "TTi(4)": ["≥20", "1TB------_1PA2PB0PB"],
    "TTi(5)": ["≥223", "1TB0PA2PA_2PA---1PA"],
    "TTi(6)": [">295", "1TA2PA0TB_---1PC---_1PA0TC---"],
    "TTi(7)": ["≥3.467e15", "1TB3TB2PB---_2TB1PA0PA2TB"],

    // Uniform-Action Terminating Turmite

    "TTu(2)": ["≥10", "1TA1TB_---0PA"],
    "TTu(3)": ["≥29", "1TB1TC_0PA0PC_0PB---"],
    "TTu(4)": ["≥316", "1PB1PA_0PC---_1TC1TD_0PA0PD"],
    "TTu(5)": ["≥601", "0PB0PC_1TC1TB_0PA0PD_1PA1PE_1TA---"],

    // Blanking Terminating Turmite

    "TLT(2,2)": ["≥12", "1PB0PA_1TA0TA"],
    "TLT(3,2)": ["≥84", "1TB1PC_1TA0PA_1PA0TB"],
    "TLT(4,2)": ["≥267", "1TB0TD_1PC0PA_0PA0TD_1PD0PB"],
    "TLT(2,3)": ["≥108", "1TB0TA0PB_2PA2PB0PA"],
    "TLT(3,3)": ["≥2,122", "1TB2PA0TA_1TA0TB2PC_2PB0PA0TC"],
    "TLT(2,4)": ["≥357", "1TB2TB0TB2PA_3TA2PA0PA3PB"],

    // Instructions Limited Blanking Terminating Turmite

    "TLTi(2)": ["≥4", "1TA0TA"],
    "TLTi(3)": ["≥7", "1TB0TB_0PA---"],
    "TLTi(4)": ["≥12", "1PB0PA_1TA0TA"],
    "TLTi(5)": ["≥24", "1TB2PB0PA_2TA---0TA"],
    "TLTi(6)": ["≥108", "1TB0TA0PB_2PA2PB0PA"],
    "TLTi(8)": ["≥357", "1TB2TB0TB2PA_3TA2PA0PA3PB"],
    "TLTi(9)": ["≥2,122", "1TB2PA0TA_1TA0TB2PC_2PB0PA0TC"],

    // Uniform-Action Blanking Terminating Turmite

    "TLTu(2)": ["≥7", "1TA1TB_0TB0TA"],
    "TLTu(3)": ["≥14", "1PB1PC_0TA0TB_1PA1PB"],
    "TLTu(4)": ["≥112", "1PB1PC_0TC0TB_1PD1PA_0TD0TA"],
    "TLTu(5)": ["≥292", "1TA1TB_0PA0PC_0PB0PD_0TE0TD_1PD1PE"],

    // Semi-Infinite Tape Terminating Turmite

    "TTt(2,2)": ["≥4", "1PB0TB_1TA0PB"],
    "TTt(3,2)": ["≥23", "0PB0PC_1PC0TA_1TB1TC"],
    "TTt(4,2)": ["≥166", "1PB0TB_0PC0TA_0PD0PB_1TB1TA"],
    "TTt(2,3)": ["≥39", "2PB1TA1TB_2TA0TA0PB"],
    "TTt(3,3)": ["≥134", "1PB2PC2TB_1TC0TA0PB_2TC1TA2TA"],
    "TTt(2,4)": ["≥194", "0PB2PB3TB0PA_1TB2TB3PB3TA"],

    // Instructions-Limited Semi-Infinite Tape Terminating Turmite

    "TTti(3)": ["≥3", "0PB---_1TB1PB"],
    "TTti(4)": ["≥8", "0PB---_0PC---_1TC1PC"],
    "TTti(5)": ["≥21", "0PB---_0PC---_0PD---_1TC0TD"],
    "TTti(6)": ["≥39", "2PB1TA1TB_2TA0TA0PB"],
    "TTti(7)": ["≥70", "1PB---0PB_0PC---1PC_2TC0TA2PC"],
    "TTti(8)": ["≥194", "0PB2PB3TB0PA_1TB2TB3PB3TA"],

    // Uniform-Action Semi-Infinite Tape Terminating Turmite

    "TTtu(2)": ["≥2", "0PB0PB_1TB1TA"],
    "TTtu(3)": ["≥8", "1PB---_1TB1TC_0PB0PC"],
    "TTtu(4)": ["≥48", "1PB1PC_0PC0PB_0PD0PD_1TD1TA"],
    "TTtu(5)": ["≥146", "1PB---_1PC1PD_0PD0PC_1PE1PD_0TB0TC"],
};
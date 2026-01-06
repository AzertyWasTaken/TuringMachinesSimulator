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
    "BB(2,6)": [">ttee115", "1RB3RB5RA1LB5LA2LB_2LA2RA4RB---3LB2LA"],

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
    "BBu(3)": ["=17", "1RB---_0RC0RC_1LC1LA"],
    "BBu(4)": ["≥29", "1RB1RD_0LC0LA_1LC1LA_0RC---"],
    "BBu(5)": ["≥441", "1RB1RA_0RC0RE_1LC1LD_1LA1LD_---1RB"],
    "BBu(6)": [">16,088", "1RB1RF_1RC1RA_1LD1LF_0RB0RE_---1LC_---0LC"],

    // Blanking Busy Beaver

    "BLB(2,2)": ["=8", "1RB0RA_1LB1LA"],
    "BLB(3,2)": ["≥34", "1RB1LB_1LA1LC_1RC0LC"],
    "BLB(4,2)": ["≥32,779,477", "1RB1LD_1RC1RB_1LC1LA_0RC0RD"],
    "BLB(2,3)": ["≥77", "1RB2LA0RB_1LA0LB1RA"],
    "BLB(3,3)": ["≥e42,745", "1RB2RB1LA_2LC0LB2LB_2RC2RA0LC"],
    "BLB(2,4)": ["≥1.367e12", "1RB2RA1RA2RB_2LB3LA0RB0RA"],

    // Instructions-Limited Blanking Busy Beaver

    "BLBi(3)": ["=4", "1RB0RA_1LA---"],
    "BLBi(4)": ["=12", "1RB---_1RC---_1LC0RC"],
    "BLBi(5)": ["=30", "1RB------_1RC------_2LC2RC0RC"],
    "BLBi(6)": ["=77", "1RB2LA0RB_1LA0LB1RA "],
    "BLBi(7)": ["≥808", "1RB------_1RC------_0RD2LC---_1LD2RD0RC"],
    "BLBi(8)": ["≥1.367e12", "1RB2RA1RA2RB_2LB3LA0RB0RA"],
    "BLBi(9)": ["≥e42,745", "1RB2RB1LA_2LC0LB2LB_2RC2RA0LC"],

    // Uniform-Action Blanking Busy Beaver

    "BLBu(2)": ["=3", "1RB---_0LB0LA"],
    "BLBu(3)": ["≥9", "1RB---_0RC0RB_1LB1LC"],
    "BLBu(4)": ["≥133", "1RB1RA_0RC0RA_1LC1LD_0RB0RD"],
    "BLBu(5)": ["≥10,905", "1RB1RA_0RC0RA_1LC1LD_1LA1LE_0RC0RE"],

    // Semi-Infinite Tape Busy Beaver

    "BBt(2,2)": ["=3", "1RB---_1LB0RB"],
    "BBt(3,2)": ["≥12", "0RB0LB_0RC1RC_1LA0LC"],
    "BBt(4,2)": ["≥168", "1RB1LD_1RC0RC_1RD0LA_1LA0RD "],
    "BBt(5,2)": [">4,300", "0RB0RC_0RC0RE_0RD1LE_1LA1RD_1LC1RB"],
    "BBt(2,3)": ["≥17", "1RB0RA0RB_2LA2RB1LB"],
    "BBt(3,3)": [">10,053", "0RB1LA1LB_0RC2LB1RB_1LA2LC2RC"],
    "BBt(2,4)": ["≥88", "1RB2RB3LA2RA_1LA3LB0RB3RB"],
    "BBt(2,5)": ["≥415", "0RB2LA1LB4RA2RB_1LA1RB3RB4LA1LA"],
    "BBt(2,6)": [">1,429", "0RB4RB3LA2RA2LB2LA_1LA2RB5RA1RA3RA5RA"],

    // Instructions-Limited Semi-Infinite Tape Busy Beaver

    "BBti(3)": ["=3", "1RB---_1LB0RB"],
    "BBti(4)": ["=8", "1RB---_1RC---_1LC0RC"],
    "BBti(5)": ["≥18", "1RB------_1RC------_2LC2RC0RC"],
    "BBti(6)": ["≥39", "1RB------_2RC---2RB_2LC2RB0RC"],
    "BBti(7)": ["≥155", "0RB------_0RC------_1RD2RC1LC_2LC1RD---"],
    "BBti(8)": ["≥1,289", "0RB------_0RC------_0RD------_1RE2RD1LD_2LD1RE---"],
    "BBti(9)": [">10,053", "0RB1LA1LB_0RC2LB1RB_1LA2LC2RC"],

    // Uniform-Action Semi-Infinite Tape Busy Beaver

    "BBtu(2)": ["=2", "0RB---_1LA1LB"],
    "BBtu(3)": ["=11", "1RB---_0RC0RB_1LB1LC"],
    "BBtu(4)": ["≥26", "1RB---_1RC---_0RD0RC_1LC1LD"],
    "BBtu(5)": ["≥1,336", "0RB0RC_1RC1RB_0RD0RC_0RE---_1LE1LA"],

    // Terminating Turmite

    "TT(2,2)": ["=13", "1TB---_1PA0PB"],
    "TT(3,2)": ["≥82", "1PB0PA_1TA0PC_1PA---"],
    "TT(4,2)": ["≥48,186", "1TB1PA_1PC0PA_1TA0PD_---1TA"],
    "TT(2,3)": ["≥223", "1TB0PA2PA_2PA---1PA"],
    "TT(3,3)": ["≥45,153", "1PB1PA1TA_2TB2PB2PC_---2PA1TC"],
    "TT(2,4)": ["≥3.467e15", "1TA2PB3TB---_3TA1PB1TA1PA"],

    // Instructions-Limited Terminating Turmite

    "TTi(2)": ["=6", "0PB_1TA"],
    "TTi(3)": ["=13", "1TB---_1PA0PB"],
    "TTi(4)": ["≥22", "1TA2PA2PB_---0PA---"],
    "TTi(5)": ["≥223", "1TB0PA2PA_2PA---1PA"],
    "TTi(6)": [">434", "1PB------_0PC2TC---_0TA0PB0PA"],
    "TTi(7)": ["≥3.467e15", "1TA2PB3TB---_3TA1PB1TA1PA"],

    // Uniform-Action Terminating Turmite

    "TTu(2)": ["=10", "1TA1TB_---0PA"],
    "TTu(3)": ["≥29", "1TB1TC_0PA0PC_0PB---"],
    "TTu(4)": ["≥316", "1PB1PA_0PC---_1TC1TD_0PA0PD"],
    "TTu(5)": [">14,038", "1PB1PE_0PC0PB_0TA0TD_1PD1PA_---0TB"],

    // Blanking Terminating Turmite

    "TLT(2,2)": ["≥12", "1PB0PA_1TA0TA"],
    "TLT(3,2)": ["≥560", "1TB0PB_1PC0TC_1PA0PA"],
    "TLT(2,3)": ["≥108", "1TB0TA0PB_2PA2PB0PA"],
    "TLT(3,3)": [">2,122", "1TB2PA0TA_1TA0TB2PC_2PB0PA0TC"],
    "TLT(2,4)": [">537", "1TA0PB3TB1TB_0TA2PB3TA2PA"],

    // Instructions Limited Blanking Terminating Turmite

    "TLTi(2)": ["=4", "1TA0TA"],
    "TLTi(3)": ["=7", "1TB0TB_0PA---"],
    "TLTi(4)": ["≥12", "1PB0PA_1TA0TA"],
    "TLTi(5)": ["≥24", "1TB2PB0PA_2TA---0TA"],
    "TLTi(6)": ["≥560", "1TB0PB_1PC0TC_1PA0PA"],
    "TLTi(9)": [">2,122", "1TB2PA0TA_1TA0TB2PC_2PB0PA0TC"],

    // Uniform-Action Blanking Terminating Turmite

    "TLTu(2)": ["=7", "1TA1TB_0TB0TA"],
    "TLTu(3)": ["≥14", "1PB1PC_0TA0TB_1PA1PB"],
    "TLTu(4)": ["≥112", "1PB1PC_0TC0TB_1PD1PA_0TD0TA"],
    "TLTu(5)": [">1,361", "1TA1TB_1PE1PC_0PD0PC_1PB1PD_0TD0TC"],

    // Semi-Infinite Tape Terminating Turmite

    "TTt(2,2)": ["=4", "1PB0TB_1TA0PB"],
    "TTt(3,2)": ["≥23", "0PB0PC_1PC0TA_1TB1TC"],
    "TTt(4,2)": ["≥166", "1PB0TB_0PC0TA_0PD0PB_1TB1TA"],
    "TTt(5,2)": [">1,644", "0PB0PC_0PC1TC_0PD0PE_1PE1PD_1TC1TA"],
    "TTt(2,3)": ["≥39", "1PB2TB2TA_1TA0PB0TA"],
    "TTt(3,3)": [">915", "0PB2PB2PA_0PC2TA0PB_1TB1PC0TC"],
    "TTt(2,4)": ["≥871", "1PB3TA2PB1TA_2TA0TA0PB3TB"],

    // Instructions-Limited Semi-Infinite Tape Terminating Turmite

    "TTti(3)": ["=3", "0PB---_1TB1PB"],
    "TTti(4)": ["=8", "0PB---_0PC---_1TC1PC"],
    "TTti(5)": ["≥21", "0PB---_0PC---_0PD---_1TC0TD"],
    "TTti(6)": ["≥49", "0PB---_0PC---_0PD0TC_1TC1PD"],
    "TTti(7)": ["≥232", "0PB---_0PC---_0PD---_0PE0TD_1TD1PE"],
    "TTti(8)": [">989", "0PB---_0PC---_0PD---_0PE---_0PF0TE_1TE1PF"],
    "TTti(9)": [">4,048", "0PB---_0PC---_0PD---_0PE---_0PF---_0PG0TF_1TF1PG"],

    // Uniform-Action Semi-Infinite Tape Terminating Turmite

    "TTtu(2)": ["=2", "0PB0PB_1TB1TA"],
    "TTtu(3)": ["≥16", "0PB0PC_1PC1PB_1TA1TB"],
    "TTtu(4)": ["≥48", "1PB1PC_0PC0PB_0PD0PD_1TD1TA"],
    "TTtu(5)": ["≥450", "1PB---_0PC0PD_1TC1TB_1TA1TE_0PE0PB"],
    "TTtu(6)": [">1,916", "0PB0PF_0PC0PE_0PD0PF_0PE0PA_1TF1TD_1PE1PC"],
};